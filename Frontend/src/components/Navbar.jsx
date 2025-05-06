
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Check token and user on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Sync token/user if changed elsewhere
  useEffect(() => {
    const syncToken = () => {
      const updatedToken = localStorage.getItem('token');
      const updatedUser = localStorage.getItem('user');
      setToken(updatedToken);
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('storage', syncToken);
    return () => window.removeEventListener('storage', syncToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='flex justify-between items-center px-10 py-4 border-b bg-white shadow-sm'>

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img onClick={() => navigate('/')} className="w-12 cursor-pointer" src={assets.logo} alt="logo" />
        <div>
          <h1 className="text-lg font-bold text-primary">Doctor Sathi</h1>
          <p className="text-xs text-cyan-500">Always Caring | Always Here</p>
        </div>
      </div>

      {/* Nav Links */}
      <div className='flex-1 flex justify-center'>
        <ul className='flex items-center gap-10 font-medium text-gray-700'>
          <NavLink to='/'><li className='py-1'>Home</li></NavLink>
          <NavLink to='/doctors'><li className='py-1'>All Doctors</li></NavLink>
          <NavLink to='/about'><li className='py-1'>About</li></NavLink>
          <NavLink to='/contact'><li className='py-1'>Contact Us</li></NavLink>
        </ul>
      </div>

      {/* Right Side: Profile Dropdown OR Register Button */}
      <div className='flex items-center gap-2'>
        {
          token && user && location.pathname === '/'
            ? (
              <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-8 h-8 rounded-full object-cover' src={assets.profile_pic} alt="Profile" />
                <span className='text-sm font-medium'>{user.full_name}</span>
                <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
                <div className='absolute top-0 right-0 mt-2 w-48 pt-14 text-base font-medium text-gray-600 hidden group-hover:block z-10'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={() => navigate('/my-appointment')} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
                </div>
              </div>
            )
            : !token && (
              <button
                onClick={() => navigate('/register')}
                className='bg-primary text-white px-4 py-1 rounded font-light hidden md:block'>
                Register
              </button>
            )
        }
      </div>
    </div>
  );
};

export default Navbar;