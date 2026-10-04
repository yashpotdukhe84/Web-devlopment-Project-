import React, { createContext, useContext, useState, useEffect } from 'react'
import { addCampaign, getCampaigns, addDonation, getDonations, addVolunteer, getVolunteers, updateCampaign } from '../firebase'

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

  // Load data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load campaigns from Firebase
        const campaignsResult = await getCampaigns()
        if (campaignsResult.success) {
          setCampaigns(campaignsResult.campaigns)
        } else {
          console.error('Failed to load campaigns:', campaignsResult.error)
          // Fallback to mock data if Firebase fails
          loadMockData()
        }

        // Load donations from Firebase
        const donationsResult = await getDonations()
        if (donationsResult.success) {
          setDonations(donationsResult.donations)
        } else {
          console.error('Failed to load donations:', donationsResult.error)
        }

        // Load volunteers from Firebase
        const volunteersResult = await getVolunteers()
        if (volunteersResult.success) {
          setVolunteers(volunteersResult.volunteers)
        } else {
          console.error('Failed to load volunteers:', volunteersResult.error)
        }
      } catch (error) {
        console.error('Error loading data from Firebase:', error)
        // Fallback to mock data
        loadMockData()
      }
    }

    const loadMockData = () => {
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
    }

    loadData()
  }, [])

  const createCampaign = async (campaignData) => {
    try {
      const result = await addCampaign(campaignData)
      if (result.success) {
        // Reload campaigns from Firebase to get the updated list
        const campaignsResult = await getCampaigns()
        if (campaignsResult.success) {
          setCampaigns(campaignsResult.campaigns)
        }
        return { success: true, id: result.id }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      return { success: false, error: error.message }
    }
  }

  const updateCampaign = async (id, updates) => {
    try {
      const result = await updateCampaign(id, updates)
      if (result.success) {
        // Reload campaigns from Firebase to get the updated list
        const campaignsResult = await getCampaigns()
        if (campaignsResult.success) {
          setCampaigns(campaignsResult.campaigns)
        }
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error updating campaign:', error)
      return { success: false, error: error.message }
    }
  }

  const donateToCampaign = async (campaignId, donationData) => {
    try {
      const result = await addDonation(donationData)
      if (result.success) {
        // Reload donations and campaigns from Firebase
        const donationsResult = await getDonations()
        if (donationsResult.success) {
          setDonations(donationsResult.donations)
        }
        
        const campaignsResult = await getCampaigns()
        if (campaignsResult.success) {
          setCampaigns(campaignsResult.campaigns)
        }
        
        return { success: true, id: result.id }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error adding donation:', error)
      return { success: false, error: error.message }
    }
  }

  const volunteerForCampaign = async (campaignId, volunteerData) => {
    try {
      const result = await addVolunteer(volunteerData)
      if (result.success) {
        // Reload volunteers and campaigns from Firebase
        const volunteersResult = await getVolunteers()
        if (volunteersResult.success) {
          setVolunteers(volunteersResult.volunteers)
        }
        
        const campaignsResult = await getCampaigns()
        if (campaignsResult.success) {
          setCampaigns(campaignsResult.campaigns)
        }
        
        return { success: true, id: result.id }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error adding volunteer:', error)
      return { success: false, error: error.message }
    }
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
