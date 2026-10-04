import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCampaigns } from '../contexts/CampaignContext'
import { 
  Upload, 
  X, 
  Plus, 
  DollarSign, 
  Users, 
  Calendar, 
  MapPin, 
  FileText,
  Target
} from 'lucide-react'

const CreateCampaign = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { createCampaign } = useCampaigns()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Health & Environment',
    targetAmount: '',
    targetVolunteers: '',
    location: '',
    startDate: '',
    endDate: '',
    requirements: [''],
    images: []
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const categories = [
    'Health & Environment',
    'Education',
    'Disaster Relief',
    'Community Development',
    'Animal Welfare',
    'Technology',
    'Arts & Culture',
    'Sports & Recreation'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements]
    newRequirements[index] = value
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }))
  }

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const removeRequirement = (index) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        requirements: newRequirements
      }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }))
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.targetAmount || formData.targetAmount <= 0) {
      newErrors.targetAmount = 'Target amount must be greater than 0'
    }
    if (!formData.targetVolunteers || formData.targetVolunteers <= 0) {
      newErrors.targetVolunteers = 'Target volunteers must be greater than 0'
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    if (formData.requirements.some(req => !req.trim())) {
      newErrors.requirements = 'All requirements must be filled'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }

    if (user.userType !== 'ngo') {
      alert('Only NGOs can create campaigns')
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)
    const campaignData = {
      ...formData,
      targetAmount: parseInt(formData.targetAmount),
      targetVolunteers: parseInt(formData.targetVolunteers),
      ngo: {
        name: user.name,
        id: user.id,
        verified: user.verified
      },
      // Use placeholder images if none uploaded
      images: formData.images.length > 0 ? formData.images : [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
      ]
    }

    const newCampaign = createCampaign(campaignData)
    navigate(`/campaigns/${newCampaign.id}`)
    setLoading(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Please log in to create a campaign</h2>
          <button onClick={() => navigate('/login')} className="btn-primary">Login</button>
        </div>
      </div>
    )
  }

  if (user.userType !== 'ngo') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Only NGOs can create campaigns</h2>
          <p className="text-secondary-600 mb-4">Please register as an NGO to create campaigns.</p>
          <button onClick={() => navigate('/register')} className="btn-primary">Register as NGO</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Create New Campaign</h1>
          <p className="text-secondary-600">
            Share your cause with the world and connect with donors and volunteers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label">Campaign Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input-field ${errors.title ? 'border-danger-500' : ''}`}
                  placeholder="Enter a compelling title for your campaign"
                />
                {errors.title && <p className="text-danger-600 text-sm mt-1">{errors.title}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className={`input-field ${errors.description ? 'border-danger-500' : ''}`}
                  placeholder="Describe your campaign, its goals, and the impact it will make"
                />
                {errors.description && <p className="text-danger-600 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Location *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.location ? 'border-danger-500' : ''}`}
                    placeholder="City, State, Country"
                  />
                </div>
                {errors.location && <p className="text-danger-600 text-sm mt-1">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Goals and Timeline */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Goals and Timeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Target Amount ($) *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    type="number"
                    name="targetAmount"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.targetAmount ? 'border-danger-500' : ''}`}
                    placeholder="10000"
                    min="1"
                  />
                </div>
                {errors.targetAmount && <p className="text-danger-600 text-sm mt-1">{errors.targetAmount}</p>}
              </div>

              <div>
                <label className="label">Target Volunteers *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    type="number"
                    name="targetVolunteers"
                    value={formData.targetVolunteers}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.targetVolunteers ? 'border-danger-500' : ''}`}
                    placeholder="25"
                    min="1"
                  />
                </div>
                {errors.targetVolunteers && <p className="text-danger-600 text-sm mt-1">{errors.targetVolunteers}</p>}
              </div>

              <div>
                <label className="label">Start Date *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.startDate ? 'border-danger-500' : ''}`}
                  />
                </div>
                {errors.startDate && <p className="text-danger-600 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="label">End Date *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-secondary-400" />
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.endDate ? 'border-danger-500' : ''}`}
                  />
                </div>
                {errors.endDate && <p className="text-danger-600 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Requirements</h2>
            
            <div className="space-y-4">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      className={`input-field ${errors.requirements ? 'border-danger-500' : ''}`}
                      placeholder="Enter a requirement (e.g., Water purification systems)"
                    />
                  </div>
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-danger-600 hover:text-danger-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Requirement
              </button>
              
              {errors.requirements && <p className="text-danger-600 text-sm">{errors.requirements}</p>}
            </div>
          </div>

          {/* Images */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Images</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                  <p className="text-secondary-600 mb-4">Upload images to showcase your campaign</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="btn-secondary cursor-pointer">
                    Choose Images
                  </label>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Campaign ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-danger-600 text-white rounded-full flex items-center justify-center hover:bg-danger-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Creating Campaign...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCampaign
