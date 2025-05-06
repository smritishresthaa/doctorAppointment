import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = () => {
    const doc = doctors.find(doc => doc._id === docId)
    setDocInfo(doc)
  }

  const getAvailableSlots = () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(19, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  const handleBooking = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login to book appointment.")
      navigate("/login")
      return
    }

    if (!slotTime) {
      alert("Please select a time slot before booking.")
      return
    }

    // const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime)
    // const appointmentDate = selectedSlot.datetime.toISOString().split('T')[0]

    const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime)
    const appointmentDate = selectedSlot.datetime.toISOString().split('T')[0]
    const appointmentTime = selectedSlot.datetime.toTimeString().split(' ')[0] // "HH:MM:SS"


    try {
      const res = await fetch("http://localhost:3001/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          doctor_id: docInfo._id,
          appointment_date: appointmentDate,
          appointment_time: slotTime
        })
      })

      const data = await res.json()

      if (data.success) {
        alert("Appointment booked successfully!")
        navigate("/my-appointments")
      } else {
        alert("Failed to book appointment: " + data.message)
      }
    } catch (err) {
      console.error("Booking error:", err)
      alert("Something went wrong while booking.")
    }
  }

  if (!docInfo) return <p className="p-4">Loading...</p>

  return (
    <div className='p-4'>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-6'>
        <div>
          <img className='w-full sm:max-w-[300px] rounded' src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className='flex-1 border-gray-600 rounded-lg p-8 py-7 bg-[#d7f2f7] mx-2 sm:mx-0 mt-[-80px] sm:mt-0 flex-col gap-2'>
          <p className='text-xl font-semibold text-gray-800'>{docInfo.name}</p>
          <div className='text-gray-600'>
            <p className='text-base'>{docInfo.speciality}</p>
            <button className='mt-1 bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm'>{docInfo.experience}</button>
          </div>

          <div className='mt-4'>
            <p className='text-md font-medium text-gray-700 mb-1'>About</p>
            <p className='text-sm text-gray-600'>{docInfo.about}</p><br />
          </div>

          <p className='text-md font-medium text-gray-700 mb-1'>
            Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center w-16 h-20 flex flex-col justify-center items-center cursor-pointer ${slotIndex === index
                  ? 'bg-primary text-white'
                  : 'border border-gray-300 text-gray-800'
                  } rounded-lg`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                ? 'bg-primary text-white'
                : 'text-gray-800 border border-gray-400'
                }`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleBooking}
            className='bg-primary text-white w-30 text-sm font-medium px-12 py-3 rounded-full ml-[-120px]'
          >
            Book an appointment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Appointment
