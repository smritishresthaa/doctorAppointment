import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('MyAppointments');

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(app => new Date(app.appointment_date) >= new Date());
  const pastAppointments = appointments.filter(app => new Date(app.appointment_date) < new Date());

  const getAppointmentDetails = (appointmentsList) => {
    return appointmentsList.map(app => {
      const doctor = doctors.find(doc => doc._id === app.doctor_id);
      return {
        ...doctor,
        date: new Date(app.appointment_date).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'long', year: 'numeric'
        }),
        time: app.appointment_time,
        appointmentId: app._id,
      };
    });
  };

  const dataToShow = activeTab === 'MyAppointments'
    ? getAppointmentDetails(upcomingAppointments)
    : getAppointmentDetails(pastAppointments);

  return (
    <div>
      {/* Tabs */}
      <div className='flex gap-6 mt-12 border-b'>
        <button
          onClick={() => setActiveTab('MyAppointments')}
          className={`pb-3 font-medium text-zinc-700 ${activeTab === 'MyAppointments' ? 'border-b-2 border-primary' : ''}`}>
          My Appointments
        </button>
        <button
          onClick={() => setActiveTab('PastHistory')}
          className={`pb-3 font-medium text-zinc-700 ${activeTab === 'PastHistory' ? 'border-b-2 border-primary' : ''}`}>
          Past History
        </button>
      </div>

      {/* Appointment Cards */}
      <div>
        {dataToShow.map((item) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={item.appointmentId}>
            <div>
              <img className='w-32' src={item.image} alt={item.name} />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p><br />
              <p className='text-zinc-700 font-medium mt-1'>Address</p>
              <p className='text-xs'>{item.address}</p><br />
              <p className='text-xs'>
                <span className='text-xs text-neutral-700 font-medium'>Date & Time: </span>
                {item.date} | {item.time}
              </p>
            </div>

            {/* Action Buttons only for upcoming appointments */}
            {activeTab === 'MyAppointments' && (
              <div className='flex flex-col justify-end gap-2'>
                <button className='text-sm text-primary text-center sm:min-w-48 py-2 border border-primary rounded hover:bg-primary hover:text-white transition-all duration-300'>
                  Reschedule
                </button>
                <button className='text-sm text-red-600 text-center sm:min-w-48 py-2 border border-red-600 rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                  Cancel Appointment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;