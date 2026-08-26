// Firebase 초기화
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBHV6NxjzDqtQehLtiaVGKmdwsQxW_iP3U",
  authDomain: "osrnd-website.firebaseapp.com",
  projectId: "osrnd-website",
  storageBucket: "osrnd-website.firebasestorage.app",
  messagingSenderId: "873218725689",
  appId: "1:873218725689:web:ef97d4c103424c209abae8"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
