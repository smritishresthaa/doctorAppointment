import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
<<<<<<< HEAD
  const { doctorList, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    getAllDoctors()
  }, []) // Dependency array prevents infinite loop
=======


  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])
>>>>>>> 918fdd726654860975dafa66fc7e9f92be9a6a3a

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctorList.map((item, index) => (
            <div className='border border-primary rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input type="checkbox" checked={item.available} readOnly />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
