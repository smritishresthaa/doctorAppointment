// AdminContext.js
import { createContext, useState } from "react"
import { doctors as doctorData } from "../assets/assets" // alias to avoid name conflict

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  const [aToken, setAtoken] = useState(localStorage.getItem('aToken') || '')
  const [doctorList, setDoctorList] = useState([])

  const getAllDoctors = () => {
    try {
      setDoctorList(doctorData)
      console.log(doctorData)
    } catch (error) {
      console.error("Error loading doctors:", error)
    }
  }

  const value = {
    aToken,
    setAtoken,
    doctorList,
    getAllDoctors,
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
