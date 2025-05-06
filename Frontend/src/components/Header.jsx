import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='bg-primary rounded-lg px-6 md:px-10 py-6 md:py-10'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10'>

        {/* Left side: Text */}
        <div className='w-full md:w-1/2 flex flex-col justify-center gap-6 text-white'>
          <p className='text-1.5xl md:text-1.5xl lg:text-4xl font-semibold leading-tight'>
            Your Trusted Friend in HealthCare <br />
            where care meets Friendship; Doctor Sathi
          </p>

          <a href="#"
            className='inline-flex items-center gap-2 bg-white text-primary font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 w-fit'>
            Find a Doctor <img src={assets.arrow_icon} alt="" className='w-5 h-5' />
          </a>
        </div>

        {/* Right side: Image */}
        <div className='w-full md:w-1/2'>
          <img
            src={assets.group_profiles}
            alt="Group Profiles"
            className='w-full h-auto object-contain translate-y-6 md:translate-y-10'
          />
        </div>

      </div>
    </div>
  )
}

export default Header
