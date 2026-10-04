import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SocialImpact</span>
            </div>
            <p className="text-secondary-300 text-sm leading-relaxed">
              Connecting NGOs, donors, and volunteers to create meaningful social impact. 
              Together, we can build a better world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/campaigns" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* For Organizations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Organizations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  NGO Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Create Campaign
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Impact Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Verification Process
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-secondary-300 text-sm">contact@socialimpact.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-secondary-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-1" />
                <span className="text-secondary-300 text-sm">
                  123 Social Impact Street<br />
                  Community City, CC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2024 SocialImpact Platform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
