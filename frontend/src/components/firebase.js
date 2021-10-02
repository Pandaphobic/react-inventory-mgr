import firebase from "firebase/compat/app"
import "firebase/compat/auth"
require("dotenv").config()

const app = firebase.initializeApp({
  apiKey: "AIzaSyCFvk9XRd0Io2NoS-XCTq48cRvJnRMdTfU",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
})

export const auth = app.auth()
export default app
