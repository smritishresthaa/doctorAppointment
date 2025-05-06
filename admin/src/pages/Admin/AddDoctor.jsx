import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {


  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [address, setAddress] = useState('')


  // backendURL NEEDED

  const onSubmitHandler = async (event) =>
    event.preventDefault()
  {
    // try {
    //   if (!docImg) {
    //     return toast.error('Image not Selected')
    //   }

    //   const formData = new FormData()
    //   formData.append('image', docImg)
    //   formData.append('name', name)
    //   formData.append('email', email)
    //   formData.append('password', password)
    //   formData.append('experience', experience)
    //   formData.append('fees', Number(fees))
    //   formData.append('about', about)
    //   formData.append('speciality', speciality)
    //   formData.append('address', JSON.stringify({ address }))

    //   //console log form data
    //   formData.forEach((value, key) => {
    //     console.log(`${key} : ${value}`)
    //   })

    //   const { data } = await axios.post(/'api/admin / add - doctor',formData,{headers{aToken}})

    //   if (data.success) {

    //     toast.success(data.message)
    // setDocImg(false)
    // setName('')
    // setEmail('')
    // setPassword('')
    // setAddress('')
    // setAbout('')
    // setFees('')


    //   } else {
    //     toast.error(data.message)
    //   }

    // }
    // catch (error)
    // toast.error(error.message)
    // console.log(error)
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w -full max-w-4xl max-h-[-80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8 text-gray-600'>

          {/* Left Column: Name, Email, Password, Experience, About, Button */}
          <div className='w-full lg:flex-1 flex flex-col '>
            <div className='flex-1 flex flex-col gap-1 '>
              <p>Doctor name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
              </select>
            </div>

            <div>
              <p className='mt-4 mb-2'>About Doctor</p>
              <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor' rows={5} required />
            </div>

            <button type='submit' className='bg-primary px-10 py-3 mt-4  text-white rounded-full' >Add Doctor</button>
          </div>

          {/* Right Column: Fees, Speciality, Address */}
          <div className='flex-1 space-y-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>


            <div className='w-full lg:flex-1 flex flex-col gap-4 '>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Speciality</p>
                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' required>
                  <option value="General Physician">General Physician</option>
                  <option value="Gynocologist">Gynocologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Psyciatrist">Psyciatrist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>
                </select>
              </div>

            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} className='border rounded px-3 py-2'
                type="text" placeholder='Address required' required />
            </div>
          </div>

        </div>
      </div>
    </form>
  )
}

export default AddDoctor
