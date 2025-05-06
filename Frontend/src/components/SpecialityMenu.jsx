import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <div className='flex sm:justify-center gap-12 pt-5 w-full overflow-scroll'>
        {specialityData.map((item, index) => (
          <Link onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
            <img src={item.image} alt="" className='w-14 h-14 mb-2 rounded-full object-cover' />
            < p > {item.speciality}</p>
          </Link>
        ))
        }
      </div >

    </div >
  )
}

export default SpecialityMenu