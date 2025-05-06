import React, { useContext } from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {

  // const { aToken, setAToken } = useContext(AdminContext)

  // const navigate = useNavigate()

  // const logout = () => {
  //   navigate('/')
  //   aToken && setAtoken('')
  //   aToken && localStorage.removeItem('aToken')
  // }
  return (
    <div className='flex justify-between item-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs '>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        {/* <p>{aToken ? 'Admin' : 'Doctor'}</p> */}
      </div>
      {/* <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full '>Logout</button> */}

      <button className='bg-primary text-white text-sm px-10 py-2 rounded-full '>Logout</button>
    </div>
  )
}

export default Navbar

