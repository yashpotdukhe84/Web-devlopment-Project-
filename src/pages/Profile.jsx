import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCampaigns } from '../contexts/CampaignContext'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Heart, 
  Users, 
  Edit,
  Save,
  X,
  Calendar,
  Target,
  DollarSign
} from 'lucide-react'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { campaigns, donations, volunteers } = useCampaigns()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    organization: user?.organization || ''
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    setEditData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      organization: user.organization || ''
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    updateProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      organization: user.organization || ''
    })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Get user-specific data
  const userCampaigns = campaigns.filter(c => c.ngo.id === user.id)
  const userDonations = donations.filter(d => d.donorId === user.id)
  const userVolunteerWork = volunteers.filter(v => v.volunteerId === user.id)

  const getUserStats = () => {
    switch (user.userType) {
      case 'ngo':
        return [
          { label: 'Campaigns Created', value: userCampaigns.length, icon: Target },
          { label: 'Total Raised', value: `$${userCampaigns.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString()}`, icon: DollarSign },
          { label: 'Volunteers', value: userCampaigns.reduce((sum, c) => sum + c.currentVolunteers, 0), icon: Users },
          { label: 'Completed', value: userCampaigns.filter(c => c.status === 'completed').length, icon: Calendar }
        ]
      case 'donor':
        return [
          { label: 'Total Donated', value: `$${userDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`, icon: DollarSign },
          { label: 'Campaigns Supported', value: new Set(userDonations.map(d => d.campaignId)).size, icon: Heart },
          { label: 'This Month', value: `$${userDonations
            .filter(d => new Date(d.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
            .reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`, icon: Calendar },
          { label: 'Impact Score', value: 'High', icon: Target }
        ]
      case 'volunteer':
        return [
          { label: 'Active Projects', value: userVolunteerWork.filter(v => v.status === 'active').length, icon: Target },
          { label: 'Hours Contributed', value: '120+', icon: Calendar },
          { label: 'Projects Completed', value: userVolunteerWork.filter(v => v.status === 'completed').length, icon: Heart },
          { label: 'Impact Score', value: 'Excellent', icon: Users }
        ]
      default:
        return []
    }
  }

  const stats = getUserStats()

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="card mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                {user.userType === 'ngo' ? (
                  <Building2 className="w-10 h-10 text-primary-600" />
                ) : user.userType === 'donor' ? (
                  <Heart className="w-10 h-10 text-primary-600" />
                ) : (
                  <Users className="w-10 h-10 text-primary-600" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-secondary-900">{user.name}</h1>
                <p className="text-secondary-600 capitalize">{user.userType}</p>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.verified ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'
                  }`}>
                    {user.verified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="btn-secondary flex items-center"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                      <User className="w-5 h-5 text-secondary-400 mr-3" />
                      <span className="text-secondary-900">{user.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="label">Email</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <Mail className="w-5 h-5 text-secondary-400 mr-3" />
                    <span className="text-secondary-900">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="label">Phone</label>
                  {isEditing ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-secondary-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                        className="input-field pl-10"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                      <Phone className="w-5 h-5 text-secondary-400 mr-3" />
                      <span className="text-secondary-900">{user.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="label">Location</label>
                  {isEditing ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-secondary-400" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleChange}
                        className="input-field pl-10"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-secondary-400 mr-3" />
                      <span className="text-secondary-900">{user.location || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {user.userType === 'ngo' && (
                  <div className="md:col-span-2">
                    <label className="label">Organization</label>
                    {isEditing ? (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-secondary-400" />
                        </div>
                        <input
                          type="text"
                          name="organization"
                          value={editData.organization}
                          onChange={handleChange}
                          className="input-field pl-10"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <Building2 className="w-5 h-5 text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{user.organization || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 mt-6">
                  <button onClick={handleCancel} className="btn-secondary flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn-primary flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {user.userType === 'ngo' && userCampaigns.length > 0 && (
                  userCampaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-secondary-900">{campaign.title}</h3>
                        <p className="text-sm text-secondary-600">
                          {campaign.progress}% complete • ${campaign.currentAmount.toLocaleString()} raised
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-secondary-100 text-secondary-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  ))
                )}

                {user.userType === 'donor' && userDonations.length > 0 && (
                  userDonations.slice(0, 3).map((donation) => (
                    <div key={donation.id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                      <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-success-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-secondary-900">
                          Donated ${donation.amount.toLocaleString()}
                        </h3>
                        <p className="text-sm text-secondary-600">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {user.userType === 'volunteer' && userVolunteerWork.length > 0 && (
                  userVolunteerWork.slice(0, 3).map((volunteer) => (
                    <div key={volunteer.id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                      <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-warning-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-secondary-900">
                          Volunteered for Campaign {volunteer.campaignId}
                        </h3>
                        <p className="text-sm text-secondary-600">
                          Joined {new Date(volunteer.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        volunteer.status === 'active' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-secondary-100 text-secondary-800'
                      }`}>
                        {volunteer.status}
                      </span>
                    </div>
                  ))
                )}

                {((user.userType === 'ngo' && userCampaigns.length === 0) ||
                  (user.userType === 'donor' && userDonations.length === 0) ||
                  (user.userType === 'volunteer' && userVolunteerWork.length === 0)) && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-secondary-400" />
                    </div>
                    <h3 className="text-lg font-medium text-secondary-900 mb-2">No recent activity</h3>
                    <p className="text-secondary-600">
                      {user.userType === 'ngo' 
                        ? 'Create your first campaign to get started!'
                        : 'Start exploring campaigns to make an impact!'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Your Impact</h2>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <stat.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">{stat.label}</p>
                      <p className="text-lg font-bold text-secondary-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Account Info</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Member Since</span>
                  <span className="font-medium text-secondary-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Account Type</span>
                  <span className="font-medium text-secondary-900 capitalize">{user.userType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Status</span>
                  <span className={`font-medium ${
                    user.verified ? 'text-success-600' : 'text-warning-600'
                  }`}>
                    {user.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
