import React from 'react'
import { Heart, Users, Shield, Target, Globe, Award, CheckCircle, ArrowRight } from 'lucide-react'

const About = () => {
  const features = [
    {
      title: 'Verified Organizations',
      description: 'All NGOs are thoroughly verified to ensure legitimacy and transparency.',
      icon: Shield,
      color: 'bg-primary-100 text-primary-600'
    },
    {
      title: 'Secure Donations',
      description: 'Your donations are processed securely with full transparency and tracking.',
      icon: Heart,
      color: 'bg-success-100 text-success-600'
    },
    {
      title: 'Real Impact Tracking',
      description: 'See exactly how your contributions are making a difference in real-time.',
      icon: Target,
      color: 'bg-warning-100 text-warning-600'
    },
    {
      title: 'Community Driven',
      description: 'Built by and for the community to create meaningful social impact.',
      icon: Users,
      color: 'bg-secondary-100 text-secondary-600'
    }
  ]

  const stats = [
    { label: 'NGOs Connected', value: '500+', icon: Shield },
    { label: 'Donors Active', value: '10,000+', icon: Heart },
    { label: 'Volunteers Engaged', value: '25,000+', icon: Users },
    { label: 'Campaigns Completed', value: '1,200+', icon: Target }
  ]

  const values = [
    {
      title: 'Transparency',
      description: 'We believe in complete transparency in all transactions and impact reporting.',
      icon: CheckCircle
    },
    {
      title: 'Trust',
      description: 'Building trust through verified organizations and secure processes.',
      icon: Shield
    },
    {
      title: 'Impact',
      description: 'Focusing on measurable, meaningful impact in communities worldwide.',
      icon: Target
    },
    {
      title: 'Community',
      description: 'Fostering a strong community of changemakers and supporters.',
      icon: Users
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              About
              <span className="text-primary-600"> SocialImpact</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              We're on a mission to connect NGOs, donors, and volunteers on a transparent platform 
              that tracks real social impact and builds trust in the community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-600 mb-6">
                To create a world where social impact is transparent, measurable, and accessible. 
                We believe that by connecting NGOs, donors, and volunteers on a single platform, 
                we can amplify the impact of social good and build stronger communities.
              </p>
              <p className="text-lg text-secondary-600 mb-8">
                Our platform ensures that every donation is tracked, every volunteer hour is valued, 
                and every NGO's impact is visible to all stakeholders.
              </p>
              <div className="flex items-center text-primary-600 font-medium">
                <span>Learn more about our impact</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="w-8 h-8 text-primary-600" />
                      </div>
                      <div className="text-2xl font-bold text-secondary-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-secondary-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose SocialImpact?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              We provide the tools and transparency needed to create meaningful social change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              These core values guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Story
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-4xl mx-auto">
              Founded in 2024, SocialImpact was born from a simple observation: the social impact 
              sector was fragmented, with NGOs struggling for visibility, donors lacking transparency, 
              and volunteers finding it difficult to discover meaningful opportunities.
            </p>
            <p className="text-xl text-primary-100 mb-8 max-w-4xl mx-auto">
              We set out to create a platform that would bridge these gaps, providing a unified 
              space where all stakeholders could connect, collaborate, and create measurable impact 
              together. Today, we're proud to be the trusted platform for thousands of organizations 
              and individuals making a difference worldwide.
            </p>
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center">
                <Award className="w-6 h-6 mr-2" />
                <span>Trusted Platform</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                <span>Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Passionate individuals working together to create positive social impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Development Team</h3>
              <p className="text-secondary-600">
                Building the technology that powers social impact around the world.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Community Team</h3>
              <p className="text-secondary-600">
                Supporting NGOs, donors, and volunteers to maximize their impact.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Impact Team</h3>
              <p className="text-secondary-600">
                Measuring and reporting on the real-world impact of our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-secondary-600 mb-8">
            Join thousands of NGOs, donors, and volunteers creating positive change worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="btn-primary text-lg px-8 py-3">
              Get Started Today
            </a>
            <a href="/contact" className="btn-secondary text-lg px-8 py-3">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
