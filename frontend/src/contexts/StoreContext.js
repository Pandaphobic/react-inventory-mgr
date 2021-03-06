import React, { useState } from "react"
import { db } from "../firebase/firebase-config"

const initialState = {
  inventory: [],
  version: "0.0.1 Beta"
}

export const Context = React.createContext()

db.collection("inventory")
  .get()
  .then(snapshot => {
    const newInventory = snapshot.docs
    newInventory.forEach(doc => {
      initialState.inventory.push(doc.data())
    })
  })

console.log(initialState.inventory)

const StoreContext = ({ children }) => {
  const [state, setState] = useState(initialState)

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>
}

export default StoreContext
