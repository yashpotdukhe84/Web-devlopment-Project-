# Firebase Setup Instructions

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install firebase
```

### 2. Firebase Configuration
The Firebase configuration is already set up in `src/firebase.js` with your project credentials.

### 3. Firebase Console Setup

#### Enable Authentication:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `new1-18582`
3. Go to **Authentication** → **Sign-in method**
4. Enable **Google** provider
5. Add your domain to authorized domains

#### Enable Firestore Database:
1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location for your database

#### Set up Security Rules (Optional):
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Run the Application
```bash
npm run dev
```

## 🔥 Features Enabled

### ✅ Google Authentication
- Users can sign in with Google
- Automatic user profile creation
- Persistent login sessions

### ✅ Firestore Database
- **Campaigns Collection**: Stores all campaign data
- **Donations Collection**: Tracks all donations
- **Volunteers Collection**: Manages volunteer registrations

### ✅ Real-time Data
- Data persists across browser sessions
- Multiple users can see the same data
- Real-time updates when data changes

## 📊 Database Structure

### Campaigns Collection
```javascript
{
  title: "Campaign Title",
  description: "Campaign description",
  ngo: {
    name: "NGO Name",
    id: "ngo-id",
    verified: true
  },
  category: "Health & Environment",
  targetAmount: 50000,
  currentAmount: 0,
  targetVolunteers: 25,
  currentVolunteers: 0,
  location: "City, State",
  startDate: "2024-01-15",
  endDate: "2024-06-15",
  status: "active",
  images: ["url1", "url2"],
  requirements: ["req1", "req2"],
  progress: 0,
  createdAt: "2024-01-01T00:00:00Z"
}
```

### Donations Collection
```javascript
{
  campaignId: "campaign-id",
  donorId: "user-id",
  amount: 5000,
  donorName: "Donor Name",
  message: "Donation message",
  status: "completed",
  createdAt: "2024-01-20T10:30:00Z"
}
```

### Volunteers Collection
```javascript
{
  campaignId: "campaign-id",
  volunteerId: "user-id",
  volunteerName: "Volunteer Name",
  skills: ["skill1", "skill2"],
  status: "active",
  joinedAt: "2024-01-18T12:00:00Z"
}
```

## 🔧 Troubleshooting

### Common Issues:

1. **Firebase not initialized**
   - Check if `npm install firebase` completed successfully
   - Verify Firebase config in `src/firebase.js`

2. **Authentication not working**
   - Ensure Google provider is enabled in Firebase Console
   - Check if domain is added to authorized domains

3. **Database permission denied**
   - Check Firestore security rules
   - Ensure user is authenticated before database operations

4. **Data not persisting**
   - Check browser console for errors
   - Verify Firestore database is created and accessible

## 🎯 Next Steps

1. **Production Setup**:
   - Set up proper Firestore security rules
   - Configure production domains
   - Set up Firebase hosting

2. **Additional Features**:
   - Email/password authentication
   - File upload for campaign images
   - Real-time notifications
   - Advanced analytics

3. **Security**:
   - Implement proper user roles
   - Add data validation
   - Set up monitoring and alerts

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Firebase Console configuration
3. Ensure all dependencies are installed
4. Check network connectivity

---

**Your Social Impact Platform is now powered by Firebase! 🔥**

