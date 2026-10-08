import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCampaigns } from '../contexts/CampaignContext'
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart,
  Globe,
  Clock,
  Target
} from 'lucide-react'

const Campaigns = () => {
  const { campaigns } = useCampaigns()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const categories = ['all', 'Health & Environment', 'Education', 'Disaster Relief', 'Community Development', 'Animal Welfare']
  const statuses = ['all', 'active', 'completed']

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'progress':
          return b.progress - a.progress
        case 'amount':
          return b.currentAmount - a.currentAmount
        default:
          return 0
      }
    })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Campaigns</h1>
          <p className="text-secondary-600">
            Discover and support meaningful causes that make a real impact in communities worldwide.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              {statuses.slice(1).map(status => (
                <option key={status} value={status} className="capitalize">{status}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="progress">Progress</option>
              <option value="amount">Amount Raised</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-secondary-600">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </p>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="card hover:shadow-lg transition-shadow">
                {/* Campaign Image */}
                <div className="relative mb-4">
                  <img
                    src={campaign.images[0]}
                    alt={campaign.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {campaign.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-secondary-100 text-secondary-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  {campaign.status === 'active' && (
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-secondary-700">
                        <Clock className="w-4 h-4 mr-1" />
                        {getDaysRemaining(campaign.endDate)} days left
                      </div>
                    </div>
                  )}
                </div>

                {/* Campaign Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>
                  <p className="text-secondary-600 text-sm line-clamp-3 mb-3">
                    {campaign.description}
                  </p>
                  
                  {/* NGO Info */}
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-900">{campaign.ngo.name}</p>
                      <p className="text-xs text-secondary-500">
                        {campaign.ngo.verified ? 'Verified NGO' : 'NGO'}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm text-secondary-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {campaign.location}
                  </div>

                  {/* Dates */}
                  <div className="flex items-center text-sm text-secondary-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-secondary-600 mb-2">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-4 h-4 text-success-600 mr-1" />
                      <span className="text-lg font-semibold text-secondary-900">
                        ${campaign.currentAmount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-secondary-500">
                      of ${campaign.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-primary-600 mr-1" />
                      <span className="text-lg font-semibold text-secondary-900">
                        {campaign.currentVolunteers}
                      </span>
                    </div>
                    <p className="text-xs text-secondary-500">
                      of {campaign.targetVolunteers} volunteers
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/campaigns/${campaign.id}`}
                  className="btn-primary w-full text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No campaigns found</h3>
            <p className="text-secondary-600 mb-4">
              Try adjusting your search criteria or browse all campaigns.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedStatus('all')
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Campaigns
