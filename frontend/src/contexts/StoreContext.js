import React, { useState } from "react"
import { auth, database } from "../components/firebase"

const initialState = {
  inventory: [],
  version: "0.0.1 Beta"
}

export const Context = React.createContext()

const StoreContext = ({ children }) => {
  const [state, setState] = useState(initialState)

  // Get Data from Database
  auth.onAuthStateChanged(user => {
    if (user) {
      database
        .collection("inventory")
        .get()
        .then(snapshot => {
          setupInventory(snapshot)
        })
    }
  })

  const setupInventory = docs => {
    docs.forEach(doc => {
      setState({ ...state, doc })
    })
  }

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>
}

export default StoreContext
