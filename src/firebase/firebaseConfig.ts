// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import other services if needed
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3CskE-Kczd_FqOU6ZNhOhXZfszWnXZWc",
  authDomain: "food-app-5a14f.firebaseapp.com",
  projectId: "food-app-5a14f",
  storageBucket: "food-app-5a14f.appspot.com",
  messagingSenderId: "511747148394",
  appId: "1:511747148394:web:a9916933256afbe4f6d813",
  measurementId: "G-HB52KNVQ0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services you want to use
export const auth = getAuth(app);
export const storage = getStorage(app);