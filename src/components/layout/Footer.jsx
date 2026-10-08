import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                SocialImpact
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting NGOs, donors, and volunteers to create meaningful social impact.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <Facebook className="w-4 h-4 text-gray-300" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <Twitter className="w-4 h-4 text-gray-300" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <Instagram className="w-4 h-4 text-gray-300" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <Linkedin className="w-4 h-4 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/campaigns" className="text-gray-300 hover:text-white text-sm">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* For Organizations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">For Organizations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  NGO Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Create Campaign
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Impact Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Verification Process
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Report Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SocialImpact. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
