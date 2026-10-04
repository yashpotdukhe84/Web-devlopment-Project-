import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCampaigns } from '../contexts/CampaignContext'
import { Heart, Users, TrendingUp, Shield, ArrowRight, CheckCircle, Star, Globe } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()
  const { campaigns } = useCampaigns()

  const stats = [
    { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, icon: Heart },
    { label: 'Total Donations', value: '$125,000+', icon: TrendingUp },
    { label: 'Volunteers', value: '500+', icon: Users },
    { label: 'NGOs', value: '50+', icon: Shield }
  ]

  const features = [
    {
      title: 'For NGOs',
      description: 'Create and manage campaigns, track donations, and engage with volunteers.',
      icon: Shield,
      color: 'bg-primary-100 text-primary-600'
    },
    {
      title: 'For Donors',
      description: 'Discover verified campaigns, donate securely, and track your impact.',
      icon: Heart,
      color: 'bg-success-100 text-success-600'
    },
    {
      title: 'For Volunteers',
      description: 'Find meaningful opportunities and make a difference in your community.',
      icon: Users,
      color: 'bg-warning-100 text-warning-600'
    }
  ]

  const recentCampaigns = campaigns.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Create
              <span className="text-primary-600"> Impact</span>
              <br />
              Together
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Connect NGOs, donors, and volunteers on a transparent platform that tracks 
              real social impact and builds trust in the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/campaigns" className="btn-primary text-lg px-8 py-3">
                Explore Campaigns
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              {!user && (
                <Link to="/register" className="btn-secondary text-lg px-8 py-3">
                  Join Our Community
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                <div className="text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Our platform brings together all stakeholders in social impact to create 
              meaningful change with complete transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-lg mb-6`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Campaigns Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Discover impactful campaigns that need your support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="card hover:shadow-lg transition-shadow">
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
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>
                  <p className="text-secondary-600 text-sm line-clamp-3 mb-3">
                    {campaign.description}
                  </p>
                  <div className="flex items-center text-sm text-secondary-500 mb-2">
                    <Globe className="w-4 h-4 mr-1" />
                    {campaign.location}
                  </div>
                </div>

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

                <div className="flex justify-between items-center text-sm text-secondary-600 mb-4">
                  <span>${campaign.currentAmount.toLocaleString()} raised</span>
                  <span>of ${campaign.targetAmount.toLocaleString()}</span>
                </div>

                <Link
                  to={`/campaigns/${campaign.id}`}
                  className="btn-primary w-full text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/campaigns" className="btn-secondary text-lg px-8 py-3">
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
            Join our community of verified NGOs, generous donors, and dedicated volunteers 
            making a real difference in the world.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-6 h-6 text-primary-200" />
              <span className="text-lg">Verified Organizations</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-6 h-6 text-primary-200" />
              <span className="text-lg">Secure Donations</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Star className="w-6 h-6 text-primary-200" />
              <span className="text-lg">Transparent Impact</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
