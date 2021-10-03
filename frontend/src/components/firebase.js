import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCFvk9XRd0Io2NoS-XCTq48cRvJnRMdTfU",
  authDomain: "inventory-manager-dev-5f8df.firebaseapp.com",
  projectId: "inventory-manager-dev-5f8df",
  storageBucket: "inventory-manager-dev-5f8df.appspot.com",
  messagingSenderId: "568526938786",
  appId: "1:568526938786:web:832291fe115c131d4c2dfb"
}

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export default app
