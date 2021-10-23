import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Sign in provider
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
// export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
// export const githubAuthProvider = new firebase.auth.GithubAuthProvider()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFvk9XRd0Io2NoS-XCTq48cRvJnRMdTfU",
  authDomain: "inventory-manager-dev-5f8df.firebaseapp.com",
  projectId: "inventory-manager-dev-5f8df",
  storageBucket: "inventory-manager-dev-5f8df.appspot.com",
  messagingSenderId: "568526938786",
  appId: "1:568526938786:web:832291fe115c131d4c2dfb"
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

// References
export const firebaseAuth = firebaseApp.auth()
// Firesore
export var itemsRef = firebaseApp.firestore().collection("items")
export var db = firebaseApp.firestore()
export default firebaseApp
