import React, { useState } from "react"

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
