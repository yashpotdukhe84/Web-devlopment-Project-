// Script to seed Firebase with sample data
import { addCampaign, addDonation, addVolunteer } from '../firebase'

export const seedFirebaseData = async () => {
  try {
    console.log('Starting to seed Firebase with sample data...')

    // Sample campaigns data
    const sampleCampaigns = [
      {
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
        progress: 65
      },
      {
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
        progress: 62.5
      },
      {
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
        progress: 100
      }
    ]

    // Add campaigns to Firebase
    const campaignIds = []
    for (const campaign of sampleCampaigns) {
      const result = await addCampaign(campaign)
      if (result.success) {
        campaignIds.push(result.id)
        console.log(`✅ Added campaign: ${campaign.title}`)
      } else {
        console.error(`❌ Failed to add campaign: ${campaign.title}`, result.error)
      }
    }

    // Sample donations data
    const sampleDonations = [
      {
        campaignId: campaignIds[0] || "campaign-1",
        donorId: "donor-1",
        amount: 5000,
        donorName: "Anonymous Donor",
        message: "Keep up the great work!",
        status: "completed"
      },
      {
        campaignId: campaignIds[0] || "campaign-1",
        donorId: "donor-2",
        amount: 2500,
        donorName: "John Smith",
        message: "Hope this helps the community",
        status: "completed"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        donorId: "donor-3",
        amount: 10000,
        donorName: "Sarah Johnson",
        message: "Education is the key to a better future",
        status: "completed"
      }
    ]

    // Add donations to Firebase
    for (const donation of sampleDonations) {
      const result = await addDonation(donation)
      if (result.success) {
        console.log(`✅ Added donation: ${donation.donorName} - $${donation.amount}`)
      } else {
        console.error(`❌ Failed to add donation: ${donation.donorName}`, result.error)
      }
    }

    // Sample volunteers data
    const sampleVolunteers = [
      {
        campaignId: campaignIds[0] || "campaign-1",
        volunteerId: "vol-1",
        volunteerName: "Mike Wilson",
        skills: ["Water systems", "Community outreach"],
        status: "active"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        volunteerId: "vol-2",
        volunteerName: "Lisa Brown",
        skills: ["Teaching", "Child development"],
        status: "active"
      }
    ]

    // Add volunteers to Firebase
    for (const volunteer of sampleVolunteers) {
      const result = await addVolunteer(volunteer)
      if (result.success) {
        console.log(`✅ Added volunteer: ${volunteer.volunteerName}`)
      } else {
        console.error(`❌ Failed to add volunteer: ${volunteer.volunteerName}`, result.error)
      }
    }

    console.log('🎉 Firebase seeding completed!')
    return { success: true, message: 'Sample data added successfully' }

  } catch (error) {
    console.error('❌ Error seeding Firebase:', error)
    return { success: false, error: error.message }
  }
}

// Function to check if data already exists
export const checkFirebaseData = async () => {
  try {
    const { getCampaigns } = await import('../firebase')
    const result = await getCampaigns()
    if (result.success && result.campaigns.length > 0) {
      console.log(`Found ${result.campaigns.length} existing campaigns`)
      return true
    }
    return false
  } catch (error) {
    console.error('Error checking Firebase data:', error)
    return false
  }
}
