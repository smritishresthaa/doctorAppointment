import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        name: parsedUser.full_name || '',
        image: assets.profile_pic,
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        address: {
          line1: parsedUser.address_line || ''
        },
        gender: parsedUser.gender || '',
        dob: parsedUser.dob || ''
      });
    }
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="Profile" />
      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-2xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none mt-4' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-200 max-w-40' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-500'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <input className='bg-gray-200 max-w-52' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
              : <p className='text-gray-500'>{userData.address.line1}</p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-800'>

          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-200' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              : <p className='text-gray-500'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-200' type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary hover:text-white hover:bg-primary transition-all px-8 py-2 rounded-full' onClick={() => setIsEdit(false)}>Save information</button>
            : <button className='border border-primary hover:text-white hover:bg-primary transition-all px-8 py-2 rounded-full' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;