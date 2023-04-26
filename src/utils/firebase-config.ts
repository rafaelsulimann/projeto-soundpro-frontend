// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBfXyC89os3xVJkocFSdSz1tiM0MibA3s8",
  authDomain: "sound-pro-fa447.firebaseapp.com",
  projectId: "sound-pro-fa447",
  storageBucket: "sound-pro-fa447.appspot.com",
  messagingSenderId: "177272235002",
  appId: "1:177272235002:web:980388f328fde9a829ba43",
  measurementId: "G-6Y1XR17JBP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);