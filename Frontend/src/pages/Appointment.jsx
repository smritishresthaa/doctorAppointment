import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Appointment = () => {
  const { id } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const doctor = doctors.find((doc) => doc._id === id);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    const appointmentDate = selectedSlot.datetime.toISOString().split('T')[0];
    const appointmentTime = selectedSlot.time;

    try {
      const res = await fetch("http://localhost:3001/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor_id: id,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Appointment booked successfully!");
        navigate("/myappointments");
      } else {
        alert(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong.");
    }
  };

  if (!doctor) {
    return <div className="p-4 text-center text-red-600">Doctor not found</div>;
  }

  const schedule = doctor.schedule || [];

  return (
    <div className='max-w-screen-md mx-auto px-4 mt-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Book an Appointment</h1>

      <div className='bg-white shadow rounded p-6'>
        <div className='flex items-center gap-6 mb-6'>
          <img src={doctor.image} alt={doctor.name} className='w-28 h-28 object-cover rounded-full' />
          <div>
            <h2 className='text-xl font-semibold'>{doctor.name}</h2>
            <p className='text-sm text-zinc-600'>{doctor.speciality}</p>
            <p className='text-sm text-zinc-600'>{doctor.address}</p>
          </div>
        </div>

        <h3 className='text-lg font-semibold mb-3'>Select an Available Slot</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6'>
          {schedule.length === 0 ? (
            <p className='text-sm text-zinc-500'>No available slots</p>
          ) : (
            schedule.map((slot, index) => {
              const slotDate = new Date(slot.date);
              const formattedDate = slotDate.toLocaleDateString('en-GB', {
                weekday: 'short', day: '2-digit', month: 'short'
              });
              const time = slot.time;

              const isSelected =
                selectedSlot &&
                selectedSlot.datetime.getTime() === slotDate.getTime() &&
                selectedSlot.time === time;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedSlot({ datetime: slotDate, time })}
                  className={`text-sm py-2 px-3 rounded border 
                    ${isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-zinc-700 border-zinc-300'}
                    hover:border-primary hover:text-primary transition-all duration-200`}
                >
                  {formattedDate} | {time}
                </button>
              );
            })
          )}
        </div>

        <div className='text-center'>
          <button
            onClick={handleBookAppointment}
            className='bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-all'
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
