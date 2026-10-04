import React, { createContext, useContext, useState, useEffect } from 'react'

const CampaignContext = createContext()

export const useCampaigns = () => {
  const context = useContext(CampaignContext)
  if (!context) {
    throw new Error('useCampaigns must be used within a CampaignProvider')
  }
  return context
}

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([])
  const [donations, setDonations] = useState([])
  const [volunteers, setVolunteers] = useState([])

  // Mock data for demonstration
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        title: "Clean Water for Rural Communities",
        description: "Providing clean drinking water to 5 rural communities in need. This project will install water purification systems and train local volunteers for maintenance.",
        ngo: {
          name: "Water for All Foundation",
          id: "ngo-1",
          verified: true
        },
        category: "Health & Environment",
        targetAmount: 50000,
        currentAmount: 32500,
        targetVolunteers: 25,
        currentVolunteers: 18,
        location: "Rural Maharashtra, India",
        startDate: "2024-01-15",
        endDate: "2024-06-15",
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
        ],
        requirements: ["Water purification systems", "Volunteer training", "Community engagement"],
        progress: 65,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: 2,
        title: "Education for Street Children",
        description: "Setting up mobile learning centers to provide education and basic literacy to street children in urban areas.",
        ngo: {
          name: "Hope for Children NGO",
          id: "ngo-2",
          verified: true
        },
        category: "Education",
        targetAmount: 30000,
        currentAmount: 18750,
        targetVolunteers: 40,
        currentVolunteers: 32,
        location: "Mumbai, India",
        startDate: "2024-02-01",
        endDate: "2024-08-01",
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500",
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500"
        ],
        requirements: ["Educational materials", "Mobile learning equipment", "Volunteer teachers"],
        progress: 62.5,
        createdAt: "2024-01-15T00:00:00Z"
      },
      {
        id: 3,
        title: "Disaster Relief Fund",
        description: "Emergency relief fund for recent flood victims. Providing immediate food, shelter, and medical assistance.",
        ngo: {
          name: "Disaster Relief Foundation",
          id: "ngo-3",
          verified: true
        },
        category: "Disaster Relief",
        targetAmount: 100000,
        currentAmount: 100000,
        targetVolunteers: 50,
        currentVolunteers: 50,
        location: "Kerala, India",
        startDate: "2024-01-10",
        endDate: "2024-03-10",
        status: "completed",
        images: [
          "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500"
        ],
        requirements: ["Emergency supplies", "Medical aid", "Volunteer coordination"],
        progress: 100,
        createdAt: "2024-01-05T00:00:00Z"
      }
    ]

    const mockDonations = [
      {
        id: 1,
        campaignId: 1,
        donorId: "donor-1",
        amount: 5000,
        donorName: "Anonymous Donor",
        message: "Keep up the great work!",
        createdAt: "2024-01-20T10:30:00Z",
        status: "completed"
      },
      {
        id: 2,
        campaignId: 1,
        donorId: "donor-2",
        amount: 2500,
        donorName: "John Smith",
        message: "Hope this helps the community",
        createdAt: "2024-01-22T14:15:00Z",
        status: "completed"
      },
      {
        id: 3,
        campaignId: 2,
        donorId: "donor-3",
        amount: 10000,
        donorName: "Sarah Johnson",
        message: "Education is the key to a better future",
        createdAt: "2024-02-05T09:45:00Z",
        status: "completed"
      }
    ]

    const mockVolunteers = [
      {
        id: 1,
        campaignId: 1,
        volunteerId: "vol-1",
        volunteerName: "Mike Wilson",
        skills: ["Water systems", "Community outreach"],
        status: "active",
        joinedAt: "2024-01-18T12:00:00Z"
      },
      {
        id: 2,
        campaignId: 2,
        volunteerId: "vol-2",
        volunteerName: "Lisa Brown",
        skills: ["Teaching", "Child development"],
        status: "active",
        joinedAt: "2024-02-02T15:30:00Z"
      }
    ]

    setCampaigns(mockCampaigns)
    setDonations(mockDonations)
    setVolunteers(mockVolunteers)
  }, [])

  const createCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now(),
      ...campaignData,
      currentAmount: 0,
      currentVolunteers: 0,
      progress: 0,
      status: "active",
      createdAt: new Date().toISOString()
    }
    setCampaigns(prev => [newCampaign, ...prev])
    return newCampaign
  }

  const updateCampaign = (id, updates) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ))
  }

  const donateToCampaign = (campaignId, donationData) => {
    const newDonation = {
      id: Date.now(),
      campaignId,
      ...donationData,
      status: "completed",
      createdAt: new Date().toISOString()
    }
    
    setDonations(prev => [newDonation, ...prev])
    
    // Update campaign amount
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        const newAmount = campaign.currentAmount + donationData.amount
        const progress = Math.min((newAmount / campaign.targetAmount) * 100, 100)
        return {
          ...campaign,
          currentAmount: newAmount,
          progress,
          status: progress >= 100 ? "completed" : campaign.status
        }
      }
      return campaign
    }))
    
    return newDonation
  }

  const volunteerForCampaign = (campaignId, volunteerData) => {
    const newVolunteer = {
      id: Date.now(),
      campaignId,
      ...volunteerData,
      status: "active",
      joinedAt: new Date().toISOString()
    }
    
    setVolunteers(prev => [newVolunteer, ...prev])
    
    // Update campaign volunteer count
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          currentVolunteers: campaign.currentVolunteers + 1
        }
      }
      return campaign
    }))
    
    return newVolunteer
  }

  const getCampaignById = (id) => {
    return campaigns.find(campaign => campaign.id === parseInt(id))
  }

  const getCampaignDonations = (campaignId) => {
    return donations.filter(donation => donation.campaignId === campaignId)
  }

  const getCampaignVolunteers = (campaignId) => {
    return volunteers.filter(volunteer => volunteer.campaignId === campaignId)
  }

  const getCampaignsByCategory = (category) => {
    return campaigns.filter(campaign => campaign.category === category)
  }

  const getCampaignsByStatus = (status) => {
    return campaigns.filter(campaign => campaign.status === status)
  }

  const value = {
    campaigns,
    donations,
    volunteers,
    createCampaign,
    updateCampaign,
    donateToCampaign,
    volunteerForCampaign,
    getCampaignById,
    getCampaignDonations,
    getCampaignVolunteers,
    getCampaignsByCategory,
    getCampaignsByStatus
  }

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  )
}
