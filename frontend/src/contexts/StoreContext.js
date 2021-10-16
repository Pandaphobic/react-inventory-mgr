import React, { useState } from "react"
import { database } from "../components/firebase"

// Get Data from Database
database
  .collection("inventory")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.data())
    })
  })

const initialState = {
  inventory: [],
  version: "0.0.1 Beta"
}

export const Context = React.createContext()

const StoreContext = ({ children }) => {
  const [state, setState] = useState(initialState)

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>
}

export default StoreContext
