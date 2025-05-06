import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase()));


    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className=' flex flex-col gap-4 text-sm text-gray-600'>

          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded bg-[#d7f2f7] text-black cursor-pointer hover:bg-[#93cfe0] transition-all whitespace-nowrap ${speciality === "General Physician" ? "bg-[#d7f2f7]" : ""}`} >General Physician</p>
          <p onClick={() => speciality === 'Gynocologist' ? navigate('/doctors') : navigate('/doctors/Gynocologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded bg-[#d7f2f7] text-black cursor-pointer hover:bg-[#93cfe0] transition-all ${speciality === "Gynocologist" ? "bg-[#d7f2f7]" : ""}`}>Gynocologist</p>
          <p onClick={() => speciality === 'Dentist' ? navigate('/doctors') : navigate('/doctors/Dentist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded bg-[#d7f2f7] text-black cursor-pointer hover:bg-[#93cfe0] transition-all ${speciality === "Dentist" ? "bg-[#d7f2f7]" : ""} ${speciality === "" ? "bg-[#d7f2f7]" : ""}`}>Dentist</p>
          <p onClick={() => speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded bg-[#d7f2f7] text-black cursor-pointer hover:bg-[#93cfe0] transition-all ${speciality === "Cardiologist" ? "bg-[#d7f2f7]" : ""}`}>Cardiologist</p>
          <p onClick={() => speciality === 'Psychiatrist' ? navigate('/doctors') : navigate('/doctors/Psychiatrist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded bg-[#d7f2f7] text-black cursor-pointer hover:bg-[#93cfe0] transition-all ${speciality === "Psychiatrist" ? "bg-[#d7f2f7]" : ""}`}>Psyciatrist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded bg-[#d7f2f7] text-black cursor-pointer hover:bg-[#93cfe0] transition-all ${speciality === "Dermatologist" ? "bg-[#d7f2f7]" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded bg-[#d7f2f7] text-black cursor-pointer hover:bg-[#93cfe0] transition-all ${speciality === "Neurologist" ? "bg-[#d7f2f7]" : ""}`}>Neurologist</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-100 bg-[#d7f2f7] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 p-4 flex flex-col items-center gap-3'

                key={index}>

                <img className='bg-blue-50 rounded-md w-36 h-44 object-cover' src={item.image} alt="" />


                {/* Status */}
                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <p>Available</p>
                </div>

                {/* Name and Speciality */}
                <p className='text-lg font-medium text-gray-900 text-center'>{item.name}</p>
                <p className='text-sm  text-gray-600 text-center'>{item.speciality}</p>
              </div>
            ))
          }

        </div>

      </div>

    </div >
  )
}

export default Doctors