import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCampaigns } from '../contexts/CampaignContext'
import { Heart, Users, TrendingUp, Shield, ArrowRight, CheckCircle, Star, Globe, Zap, Sparkles, Rocket, Target, Award, Layers } from 'lucide-react'
import GeneralAnalytics from '../components/charts/GeneralAnalytics'
import CampaignProgressChart from '../components/charts/CampaignProgressChart'

const Home = () => {
  const { user } = useAuth()
  const { campaigns } = useCampaigns()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const stats = [
    { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, icon: Target, color: 'from-neon-blue to-neon-purple' },
    { label: 'Total Impact', value: '$125K+', icon: TrendingUp, color: 'from-neon-green to-neon-blue' },
    { label: 'Volunteers', value: '500+', icon: Users, color: 'from-neon-purple to-neon-pink' },
    { label: 'NGOs', value: '50+', icon: Shield, color: 'from-neon-pink to-neon-orange' }
  ]

  const features = [
    {
      title: 'For NGOs',
      description: 'Create and manage campaigns with real-time analytics and transparent reporting.',
      icon: Shield,
      gradient: 'from-blue-500 to-purple-600',
      delay: '0s'
    },
    {
      title: 'For Donors',
      description: 'Discover verified campaigns and track your impact with complete transparency.',
      icon: Heart,
      gradient: 'from-pink-500 to-red-500',
      delay: '0.2s'
    },
    {
      title: 'For Volunteers',
      description: 'Find meaningful opportunities and connect with communities worldwide.',
      icon: Users,
      gradient: 'from-green-500 to-blue-500',
      delay: '0.4s'
    }
  ]

  const recentCampaigns = campaigns.slice(0, 3)

  // Floating particles effect
  const FloatingParticle = ({ delay, duration, size, color }) => (
    <div
      className={`absolute ${color} rounded-full opacity-20 animate-float`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  )

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 cyber-grid opacity-30" />
      <div 
        className="fixed inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 245, 255, 0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.5}
          duration={3 + Math.random() * 4}
          size={Math.random() * 4 + 2}
          color="bg-neon-blue"
        />
      ))}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Heading with Animation */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8">
              <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent text-glow">
                Create
              </span>
              <br />
              <span className="bg-gradient-to-r from-neon-pink via-neon-orange to-neon-green bg-clip-text text-transparent text-glow">
                Impact
              </span>
              <br />
              <span className="text-white/90 text-4xl md:text-6xl">
                Together
              </span>
            </h1>
          </div>

          {/* Subtitle with Staggered Animation */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect NGOs, donors, and volunteers on a 
              <span className="text-neon-blue font-semibold"> transparent platform</span> that tracks 
              real social impact and builds trust in the community.
            </p>
          </div>

          {/* CTA Buttons with Animation */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/campaigns" className="group btn-primary text-lg px-8 py-4 relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Explore Campaigns
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            
            {!user && (
              <Link to="/register" className="group btn-secondary text-lg px-8 py-4">
                <span className="flex items-center justify-center">
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Join Our Community
                </span>
              </Link>
            )}
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 float-element">
            <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full opacity-20 animate-pulse-slow" />
          </div>
          <div className="absolute top-40 right-20 float-element" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-neon-orange rounded-full opacity-20 animate-pulse-slow" />
          </div>
          <div className="absolute bottom-40 left-20 float-element" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-neon-green to-neon-blue rounded-full opacity-20 animate-pulse-slow" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative card hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-display font-bold text-white mb-2 group-hover:text-glow transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              How It
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"> Works</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Our platform brings together all stakeholders in social impact to create 
              meaningful change with complete transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative card hover-lift"
                style={{ 
                  animationDelay: feature.delay,
                  transitionDelay: feature.delay 
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-glow transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Campaigns Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Featured
              <span className="bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent"> Campaigns</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Discover impactful campaigns that need your support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentCampaigns.map((campaign, index) => (
              <div 
                key={campaign.id} 
                className="group relative card hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={campaign.images[0]}
                    alt={campaign.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                      {campaign.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-gradient-to-r from-neon-green to-neon-blue text-white' 
                        : 'bg-white/20 text-white'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-glow transition-all duration-300">
                    {campaign.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {campaign.description}
                  </p>
                  <div className="flex items-center text-sm text-white/60 mb-4">
                    <Globe className="w-4 h-4 mr-2" />
                    {campaign.location}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-white/80 mb-3">
                    <span>Progress</span>
                    <span className="font-semibold">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-neon-blue to-neon-purple h-3 rounded-full transition-all duration-500 group-hover:shadow-glow"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-white/80 mb-6">
                  <span className="font-semibold">${campaign.currentAmount.toLocaleString()} raised</span>
                  <span>of ${campaign.targetAmount.toLocaleString()}</span>
                </div>

                <Link
                  to={`/campaigns/${campaign.id}`}
                  className="group/btn btn-primary w-full text-center"
                >
                  <span className="flex items-center justify-center">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/campaigns" className="group btn-secondary text-lg px-8 py-4">
              <span className="flex items-center justify-center">
                <Layers className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                View All Campaigns
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Platform
              <span className="bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent"> Analytics</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              See the real impact of our community through data and insights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <GeneralAnalytics campaigns={campaigns} donations={[]} />
            <CampaignProgressChart campaigns={campaigns} />
          </div>
        </div>
      </section>


      {/* Trust Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-10" />
        <div className="max-w-7xl mx-auto relative text-center">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">
            Trusted by
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"> Thousands</span>
          </h2>
          <p className="text-xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
            Join our community of verified NGOs, generous donors, and dedicated volunteers 
            making a real difference in the world.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl font-semibold text-white group-hover:text-glow transition-all duration-300">
                Verified Organizations
              </span>
            </div>
            <div className="group flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-green to-neon-blue rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl font-semibold text-white group-hover:text-glow transition-all duration-300">
                Secure Donations
              </span>
            </div>
            <div className="group flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-purple to-neon-pink rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl font-semibold text-white group-hover:text-glow transition-all duration-300">
                Transparent Impact
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
