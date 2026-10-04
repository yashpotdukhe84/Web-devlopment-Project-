// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAco6DUu-poa3xuLxs9nHirAfolZiovs0o",
  authDomain: "new1-18582.firebaseapp.com",
  projectId: "new1-18582",
  storageBucket: "new1-18582.firebasestorage.app",
  messagingSenderId: "852999517813",
  appId: "1:852999517813:web:2bcda42849cdb9f301ea3c",
  measurementId: "G-PRQH1VEJ6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create user object with additional fields
    const userData = {
      uid: user.uid,
      name: user.displayName || user.email.split('@')[0],
      email: user.email,
      avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=0ea5e9&color=fff`,
      verified: true,
      createdAt: new Date().toISOString(),
      userType: 'donor' // Default type, can be changed in profile
    };
    
    return { success: true, user: userData };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
};

// Firestore functions
export const addCampaign = async (campaignData) => {
  try {
    const docRef = await addDoc(collection(db, 'campaigns'), {
      ...campaignData,
      createdAt: new Date().toISOString(),
      status: 'active'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding campaign:', error);
    return { success: false, error: error.message };
  }
};

export const getCampaigns = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'campaigns'));
    const campaigns = [];
    querySnapshot.forEach((doc) => {
      campaigns.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, campaigns };
  } catch (error) {
    console.error('Error getting campaigns:', error);
    return { success: false, error: error.message };
  }
};

export const addDonation = async (donationData) => {
  try {
    const docRef = await addDoc(collection(db, 'donations'), {
      ...donationData,
      createdAt: new Date().toISOString(),
      status: 'completed'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding donation:', error);
    return { success: false, error: error.message };
  }
};

export const getDonations = async (campaignId = null) => {
  try {
    let q = collection(db, 'donations');
    if (campaignId) {
      q = query(q, where('campaignId', '==', campaignId));
    }
    const querySnapshot = await getDocs(q);
    const donations = [];
    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, donations };
  } catch (error) {
    console.error('Error getting donations:', error);
    return { success: false, error: error.message };
  }
};

export const addVolunteer = async (volunteerData) => {
  try {
    const docRef = await addDoc(collection(db, 'volunteers'), {
      ...volunteerData,
      joinedAt: new Date().toISOString(),
      status: 'active'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding volunteer:', error);
    return { success: false, error: error.message };
  }
};

export const getVolunteers = async (campaignId = null) => {
  try {
    let q = collection(db, 'volunteers');
    if (campaignId) {
      q = query(q, where('campaignId', '==', campaignId));
    }
    const querySnapshot = await getDocs(q);
    const volunteers = [];
    querySnapshot.forEach((doc) => {
      volunteers.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, volunteers };
  } catch (error) {
    console.error('Error getting volunteers:', error);
    return { success: false, error: error.message };
  }
};

export const updateCampaign = async (campaignId, updates) => {
  try {
    const campaignRef = doc(db, 'campaigns', campaignId);
    await updateDoc(campaignRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating campaign:', error);
    return { success: false, error: error.message };
  }
};

export default app;

