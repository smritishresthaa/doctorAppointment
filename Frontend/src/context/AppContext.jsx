
import { createContext } from "react";
import { doctors } from "../assets/assets";
import { useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const currencySymbol = 'Rs '
  const [token, setToken] = useState('')


  const value = {
    doctors, currencySymbol,
    token, setToken,
  }
  return (

    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider >
  )
}

export default AppContextProvider