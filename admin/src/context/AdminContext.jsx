import { createContext, useState } from "react"

export const AdminContext = createContext()
const AdminContextProvider = (props) => {

  const [aToken, setAtoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

  const value = {
    aToken, setAtoken

  }
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}
export default AdminContextProvider


