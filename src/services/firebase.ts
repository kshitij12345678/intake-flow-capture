
// Firebase configuration and services
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const submitToFirebase = async (patientData: any): Promise<string> => {
  try {
    console.log('Submitting to Firebase:', patientData);
    
    // Add timestamp
    const dataWithTimestamp = {
      ...patientData,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };
    
    // For demo purposes, we'll simulate the Firebase submission
    // In production, uncomment the line below:
    // const docRef = await addDoc(collection(db, 'patient_intake'), dataWithTimestamp);
    
    // Simulated response for demo
    await new Promise(resolve => setTimeout(resolve, 2000));
    const simulatedDocId = 'demo_' + Date.now().toString(36);
    
    console.log('Document written with ID: ', simulatedDocId);
    return simulatedDocId;
    
    // In production, return the actual document ID:
    // return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Failed to submit to Firebase');
  }
};
