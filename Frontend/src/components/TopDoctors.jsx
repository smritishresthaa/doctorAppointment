import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';



const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Find Top Doctors for Your Health Needs</h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 3).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 p-4 flex flex-col items-center gap-3 bg-white'
            key={index}>

            <img className='bg-blue-50 rounded-md' src={item.image} alt="" />

            {/* Status */}
            <div className='flex items-center gap-2 text-sm text-green-500'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <p>Available</p>
            </div>

            {/* Name and Speciality */}
            <p className='text-lg font-medium text-gray-900 text-center'>{item.name}</p>
            <p className='text-sm  text-gray-600 text-center'>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopDoctors