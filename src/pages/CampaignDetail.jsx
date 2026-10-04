import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCampaigns } from '../contexts/CampaignContext'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart,
  Globe,
  Clock,
  Target,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
  Star,
  MessageCircle
} from 'lucide-react'

const CampaignDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getCampaignById, donateToCampaign, volunteerForCampaign, getCampaignDonations, getCampaignVolunteers } = useCampaigns()
  
  const [activeTab, setActiveTab] = useState('overview')
  const [donationAmount, setDonationAmount] = useState('')
  const [donationMessage, setDonationMessage] = useState('')
  const [volunteerMessage, setVolunteerMessage] = useState('')
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [showVolunteerModal, setShowVolunteerModal] = useState(false)
  const [isDonating, setIsDonating] = useState(false)
  const [isVolunteering, setIsVolunteering] = useState(false)

  const campaign = getCampaignById(id)
  const donations = getCampaignDonations(parseInt(id))
  const volunteers = getCampaignVolunteers(parseInt(id))

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Campaign not found</h2>
          <button onClick={() => navigate('/campaigns')} className="btn-primary">
            Back to Campaigns
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysRemaining = (endDate) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const handleDonation = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    setIsDonating(true)
    try {
      await donateToCampaign(parseInt(id), {
        donorId: user.id,
        amount: parseInt(donationAmount),
        donorName: user.name,
        message: donationMessage
      })
      setShowDonationModal(false)
      setDonationAmount('')
      setDonationMessage('')
    } catch (error) {
      console.error('Donation failed:', error)
    } finally {
      setIsDonating(false)
    }
  }

  const handleVolunteer = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    setIsVolunteering(true)
    try {
      await volunteerForCampaign(parseInt(id), {
        volunteerId: user.id,
        volunteerName: user.name,
        skills: ['General Support'] // This could be expanded with a skills selection
      })
      setShowVolunteerModal(false)
      setVolunteerMessage('')
    } catch (error) {
      console.error('Volunteer registration failed:', error)
    } finally {
      setIsVolunteering(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'updates', label: 'Updates' },
    { id: 'donors', label: 'Donors' },
    { id: 'volunteers', label: 'Volunteers' }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/campaigns')}
          className="flex items-center text-secondary-600 hover:text-secondary-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Campaigns
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Campaign Header */}
            <div className="card mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {campaign.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-secondary-100 text-secondary-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-secondary-900 mb-4">{campaign.title}</h1>
                  
                  {/* NGO Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{campaign.ngo.name}</p>
                      <p className="text-sm text-secondary-500">
                        {campaign.ngo.verified ? 'Verified NGO' : 'NGO'} • {formatDate(campaign.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Location and Dates */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {campaign.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </div>
                    {campaign.status === 'active' && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {getDaysRemaining(campaign.endDate)} days left
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="p-2 text-secondary-400 hover:text-secondary-600">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-secondary-400 hover:text-secondary-600">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Campaign Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {campaign.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${campaign.title} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-secondary-700 leading-relaxed">{campaign.description}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="card">
              <div className="border-b border-secondary-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {campaign.requirements.map((req, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-success-600 mr-3" />
                            <span className="text-secondary-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <Target className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{campaign.ngo.name}</p>
                          <p className="text-sm text-secondary-500">2 days ago</p>
                        </div>
                      </div>
                      <p className="text-secondary-700">
                        Thank you to all our supporters! We've reached 65% of our funding goal. 
                        Your contributions are making a real difference in the community.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'donors' && (
                  <div className="space-y-4">
                    {donations.length > 0 ? (
                      donations.map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mr-3">
                              <Heart className="w-5 h-5 text-success-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{donation.donorName}</p>
                              <p className="text-sm text-secondary-500">
                                {formatDate(donation.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-secondary-900">
                              ${donation.amount.toLocaleString()}
                            </p>
                            {donation.message && (
                              <p className="text-sm text-secondary-600 italic">
                                "{donation.message}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-secondary-500 text-center py-8">No donations yet</p>
                    )}
                  </div>
                )}

                {activeTab === 'volunteers' && (
                  <div className="space-y-4">
                    {volunteers.length > 0 ? (
                      volunteers.map((volunteer) => (
                        <div key={volunteer.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center mr-3">
                              <Users className="w-5 h-5 text-warning-600" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">{volunteer.volunteerName}</p>
                              <p className="text-sm text-secondary-500">
                                Skills: {volunteer.skills?.join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              volunteer.status === 'active' 
                                ? 'bg-success-100 text-success-800' 
                                : 'bg-secondary-100 text-secondary-800'
                            }`}>
                              {volunteer.status}
                            </span>
                            <p className="text-sm text-secondary-500 mt-1">
                              Joined {formatDate(volunteer.joinedAt)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-secondary-500 text-center py-8">No volunteers yet</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Support This Campaign</h3>
              
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-secondary-600 mb-2">
                  <span>Progress</span>
                  <span>{campaign.progress}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-5 h-5 text-success-600 mr-1" />
                    <span className="text-2xl font-bold text-secondary-900">
                      ${campaign.currentAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-500">
                    of ${campaign.targetAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-5 h-5 text-primary-600 mr-1" />
                    <span className="text-2xl font-bold text-secondary-900">
                      {campaign.currentVolunteers}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-500">
                    of {campaign.targetVolunteers} volunteers
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowDonationModal(true)}
                  className="btn-primary w-full"
                  disabled={campaign.status !== 'active'}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </button>
                <button
                  onClick={() => setShowVolunteerModal(true)}
                  className="btn-secondary w-full"
                  disabled={campaign.status !== 'active'}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Volunteer
                </button>
              </div>

              {campaign.status !== 'active' && (
                <p className="text-sm text-secondary-500 text-center mt-3">
                  This campaign is no longer accepting donations or volunteers
                </p>
              )}
            </div>

            {/* Campaign Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Campaign Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Category</span>
                  <span className="font-medium text-secondary-900">{campaign.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Status</span>
                  <span className="font-medium text-secondary-900 capitalize">{campaign.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Created</span>
                  <span className="font-medium text-secondary-900">{formatDate(campaign.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">End Date</span>
                  <span className="font-medium text-secondary-900">{formatDate(campaign.endDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Modal */}
        {showDonationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Make a Donation</h3>
              <form onSubmit={handleDonation} className="space-y-4">
                <div>
                  <label className="label">Amount ($)</label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="input-field"
                    placeholder="Enter amount"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="label">Message (Optional)</label>
                  <textarea
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                    className="input-field"
                    rows="3"
                    placeholder="Leave a message of support..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDonationModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isDonating}
                    className="btn-primary flex-1"
                  >
                    {isDonating ? 'Processing...' : 'Donate'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Volunteer Modal */}
        {showVolunteerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Join as Volunteer</h3>
              <form onSubmit={handleVolunteer} className="space-y-4">
                <div>
                  <label className="label">Message (Optional)</label>
                  <textarea
                    value={volunteerMessage}
                    onChange={(e) => setVolunteerMessage(e.target.value)}
                    className="input-field"
                    rows="3"
                    placeholder="Tell us why you want to volunteer..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowVolunteerModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVolunteering}
                    className="btn-primary flex-1"
                  >
                    {isVolunteering ? 'Joining...' : 'Join as Volunteer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CampaignDetail
