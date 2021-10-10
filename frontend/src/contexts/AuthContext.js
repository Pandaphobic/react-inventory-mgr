import React, { useContext, useState, useEffect } from "react"
import { auth } from "../components/firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    auth.signOut()
  }

  function resetPassword(email) {
    auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    resetPassword
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
