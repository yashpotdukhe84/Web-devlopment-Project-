import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCampaigns } from '../contexts/CampaignContext'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Plus,
  Eye,
  Edit,
  BarChart3,
  Target,
  Clock
} from 'lucide-react'
import DonationChart from '../components/charts/DonationChart'
import CampaignProgressChart from '../components/charts/CampaignProgressChart'
import DonorImpactChart from '../components/charts/DonorImpactChart'
import VolunteerChart from '../components/charts/VolunteerChart'
import GeneralAnalytics from '../components/charts/GeneralAnalytics'

const Dashboard = () => {
  const { user } = useAuth()
  const { campaigns, donations, volunteers } = useCampaigns()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Please log in to access your dashboard</h2>
          <Link to="/login" className="btn-primary">Login</Link>
        </div>
      </div>
    )
  }

  // Get user-specific data
  const userCampaigns = campaigns.filter(c => c.ngo.id === user.id)
  const userDonations = donations.filter(d => d.donorId === user.id)
  const userVolunteerWork = volunteers.filter(v => v.volunteerId === user.id)

  // Calculate stats based on user type
  const getStats = () => {
    switch (user.userType) {
      case 'ngo':
        return [
          {
            label: 'Active Campaigns',
            value: userCampaigns.filter(c => c.status === 'active').length,
            icon: Target,
            color: 'bg-primary-100 text-primary-600'
          },
          {
            label: 'Total Raised',
            value: `$${userCampaigns.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-success-100 text-success-600'
          },
          {
            label: 'Total Volunteers',
            value: userCampaigns.reduce((sum, c) => sum + c.currentVolunteers, 0),
            icon: Users,
            color: 'bg-warning-100 text-warning-600'
          },
          {
            label: 'Completed Campaigns',
            value: userCampaigns.filter(c => c.status === 'completed').length,
            icon: BarChart3,
            color: 'bg-secondary-100 text-secondary-600'
          }
        ]
      case 'donor':
        return [
          {
            label: 'Total Donated',
            value: `$${userDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-success-100 text-success-600'
          },
          {
            label: 'Campaigns Supported',
            value: new Set(userDonations.map(d => d.campaignId)).size,
            icon: Heart,
            color: 'bg-primary-100 text-primary-600'
          },
          {
            label: 'This Month',
            value: `$${userDonations
              .filter(d => new Date(d.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
              .reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`,
            icon: TrendingUp,
            color: 'bg-warning-100 text-warning-600'
          },
          {
            label: 'Impact Score',
            value: 'High',
            icon: BarChart3,
            color: 'bg-secondary-100 text-secondary-600'
          }
        ]
      case 'volunteer':
        return [
          {
            label: 'Active Projects',
            value: userVolunteerWork.filter(v => v.status === 'active').length,
            icon: Target,
            color: 'bg-primary-100 text-primary-600'
          },
          {
            label: 'Hours Contributed',
            value: '120+',
            icon: Clock,
            color: 'bg-success-100 text-success-600'
          },
          {
            label: 'Projects Completed',
            value: userVolunteerWork.filter(v => v.status === 'completed').length,
            icon: BarChart3,
            color: 'bg-warning-100 text-warning-600'
          },
          {
            label: 'Impact Score',
            value: 'Excellent',
            icon: Heart,
            color: 'bg-secondary-100 text-secondary-600'
          }
        ]
      default:
        return []
    }
  }

  const stats = getStats()

  const getRecentActivity = () => {
    switch (user.userType) {
      case 'ngo':
        return userCampaigns.slice(0, 3)
      case 'donor':
        return userDonations.slice(0, 3)
      case 'volunteer':
        return userVolunteerWork.slice(0, 3)
      default:
        return []
    }
  }

  const recentActivity = getRecentActivity()

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-secondary-600 mt-2">
            Here's what's happening with your {user.userType} activities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {user.userType === 'donor' && (
            <>
              <DonationChart donations={userDonations} campaigns={campaigns} />
              <DonorImpactChart donations={userDonations} />
            </>
          )}
          {user.userType === 'ngo' && (
            <>
              <CampaignProgressChart campaigns={userCampaigns} />
              <VolunteerChart volunteers={volunteers} campaigns={userCampaigns} />
            </>
          )}
          {user.userType === 'volunteer' && (
            <>
              <VolunteerChart volunteers={userVolunteerWork} campaigns={campaigns} />
              <DonationChart donations={donations} campaigns={campaigns} />
            </>
          )}
        </div>

        {/* General Analytics */}
        <div className="mb-8">
          <GeneralAnalytics campaigns={campaigns} donations={donations} />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Recent Activity</h2>
                <Link to="/campaigns" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View all
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                      {user.userType === 'ngo' ? (
                        <>
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-secondary-900">{activity.title}</h3>
                            <p className="text-sm text-secondary-600">
                              {activity.progress}% complete • ${activity.currentAmount.toLocaleString()} raised
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activity.status === 'active' 
                                ? 'bg-success-100 text-success-800' 
                                : 'bg-secondary-100 text-secondary-800'
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                        </>
                      ) : user.userType === 'donor' ? (
                        <>
                          <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-success-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-secondary-900">
                              Donated ${activity.amount.toLocaleString()}
                            </h3>
                            <p className="text-sm text-secondary-600">
                              {activity.message || 'Thank you for your contribution!'}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-secondary-500">
                              {new Date(activity.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-warning-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-secondary-900">
                              Volunteered for {activity.campaignId}
                            </h3>
                            <p className="text-sm text-secondary-600">
                              Skills: {activity.skills?.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activity.status === 'active' 
                                ? 'bg-success-100 text-success-800' 
                                : 'bg-secondary-100 text-secondary-800'
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-secondary-400" />
                    </div>
                    <h3 className="text-lg font-medium text-secondary-900 mb-2">No recent activity</h3>
                    <p className="text-secondary-600 mb-4">
                      {user.userType === 'ngo' 
                        ? 'Create your first campaign to get started!'
                        : 'Start exploring campaigns to make an impact!'
                      }
                    </p>
                    <Link to="/campaigns" className="btn-primary">
                      {user.userType === 'ngo' ? 'Create Campaign' : 'Browse Campaigns'}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {user.userType === 'ngo' && (
                  <Link to="/create-campaign" className="flex items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                    <Plus className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-primary-700 font-medium">Create New Campaign</span>
                  </Link>
                )}
                <Link to="/campaigns" className="flex items-center p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <Eye className="w-5 h-5 text-secondary-600 mr-3" />
                  <span className="text-secondary-700 font-medium">Browse Campaigns</span>
                </Link>
                <Link to="/profile" className="flex items-center p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <Edit className="w-5 h-5 text-secondary-600 mr-3" />
                  <span className="text-secondary-700 font-medium">Edit Profile</span>
                </Link>
              </div>
            </div>

            {/* User Type Badge */}
            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  {user.userType === 'ngo' ? (
                    <Target className="w-6 h-6 text-primary-600" />
                  ) : user.userType === 'donor' ? (
                    <Heart className="w-6 h-6 text-primary-600" />
                  ) : (
                    <Users className="w-6 h-6 text-primary-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">
                    {user.userType === 'ngo' ? 'NGO' : user.userType === 'donor' ? 'Donor' : 'Volunteer'}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {user.verified ? 'Verified Account' : 'Account Pending Verification'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
