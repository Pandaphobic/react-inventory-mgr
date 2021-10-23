import React, { useContext, useState, useEffect } from "react"
import { firebaseAuth, googleAuthProvider } from "../firebase/firebase-config"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password)
  }

  function signin(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return firebaseAuth.signOut()
  }

  function resetPassword(email) {
    return firebaseAuth.sendPasswordResetEmail(email)
  }

  function signInWithGooglePopup() {
    return firebaseAuth.signInWithPopup(googleAuthProvider)
  }

  useEffect(() => {
    let unsubscribe = () => {
      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          // when signed in
          setCurrentUser(user)
        } else {
          // when not signed in
          setCurrentUser(null)
        }
        setLoading(false)
      })
    }
    unsubscribe()
  }, [currentUser])

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    resetPassword,
    signInWithGooglePopup
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
