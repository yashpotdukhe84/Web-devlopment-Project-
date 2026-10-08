import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users, Heart } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      userType: 'general'
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'contact@socialimpact.org',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 6pm',
      value: '+1 (555) 123-4567',
      color: 'bg-success-100 text-success-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: '123 Social Impact Street, Community City, CC 12345',
      color: 'bg-warning-100 text-warning-600'
    }
  ]

  const supportTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'ngo', label: 'NGO Support' },
    { value: 'donor', label: 'Donor Support' },
    { value: 'volunteer', label: 'Volunteer Support' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' }
  ]

  const faqs = [
    {
      question: 'How do I verify my NGO account?',
      answer: 'To verify your NGO account, please submit your organization\'s registration documents, tax-exempt status, and a brief description of your mission. Our team will review your application within 3-5 business days.'
    },
    {
      question: 'How are donations processed?',
      answer: 'Donations are processed securely through our payment partners. We support credit cards, bank transfers, and digital wallets. All transactions are encrypted and secure.'
    },
    {
      question: 'Can I volunteer for multiple campaigns?',
      answer: 'Yes! You can volunteer for as many campaigns as you like. Simply browse available opportunities and apply to those that match your interests and schedule.'
    },
    {
      question: 'How do I track the impact of my donations?',
      answer: 'You can track your donation impact through your donor dashboard, which shows real-time updates on campaign progress, fund utilization, and impact metrics.'
    },
    {
      question: 'What fees do you charge?',
      answer: 'We charge a small processing fee of 2.9% + $0.30 per donation to cover payment processing costs. This ensures we can maintain the platform and provide support to all users.'
    },
    {
      question: 'How do I report a problem with a campaign?',
      answer: 'If you encounter any issues with a campaign, please contact our support team immediately. We take all reports seriously and will investigate promptly to ensure platform integrity.'
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Send us a message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">Message Sent!</h3>
                  <p className="text-secondary-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">How can we help? *</label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      {supportTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      required
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="input-field"
                      required
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900 mb-1">{info.title}</h3>
                      <p className="text-sm text-secondary-600 mb-1">{info.description}</p>
                      <p className="text-sm font-medium text-secondary-900">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">Response Time</h3>
              </div>
              <p className="text-sm text-secondary-600">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly.
              </p>
            </div>

            {/* Business Hours */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-success-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm text-secondary-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-secondary-600">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">{faq.question}</h3>
                <p className="text-secondary-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="card bg-primary-600 text-white">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">Ready to Make an Impact?</h2>
            </div>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Join our community of changemakers and start creating positive social impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors">
                Get Started
              </a>
              <a href="/campaigns" className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors">
                Browse Campaigns
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
