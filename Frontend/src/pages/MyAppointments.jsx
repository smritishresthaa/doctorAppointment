import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
<<<<<<< HEAD
=======
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

// Import Dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"; // Adjust the import path as needed

import { Button } from "../components/ui/button"; // Adjust the import path as needed
import { Calendar as CalendarComponent } from "../components/ui/calendar"; // Adjust the import path as needed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"; // Adjust the import path as needed
>>>>>>> b8416c2e4796d67a9057b01d4a2a3e5541e95a32

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('MyAppointments');
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
>>>>>>> b8416c2e4796d67a9057b01d4a2a3e5541e95a32

  // State for reschedule dialog
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Available time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  useEffect(() => {
<<<<<<< HEAD
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
=======
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/appointments/user", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        console.log("Fetched appointments:", data.appointments);
        setAppointments(data.appointments);
      } else {
        console.error("Failed to fetch appointments:", data.message);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();

      if (data.success) {
        // Update the local state to remove the cancelled appointment
        setAppointments(prev => prev.filter(app =>
          app.id !== appointmentId && app._id !== appointmentId
        ));
        alert("Appointment cancelled successfully.");
      } else {
        alert(`Failed to cancel appointment: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Error cancelling appointment. Please try again.");
    }
  };

  const openRescheduleDialog = (appointment) => {
    setSelectedAppointment(appointment);
>>>>>>> b8416c2e4796d67a9057b01d4a2a3e5541e95a32

    // Set initial values based on current appointment
    const currentDate = new Date(appointment.appointment_date);
    setNewDate(currentDate);
    setNewTime(appointment.appointment_time);

    setRescheduleDialogOpen(true);
  };

  const handleReschedule = async () => {
    if (!newDate || !newTime) {
      alert("Please select both date and time");
      return;
    }

    setIsRescheduling(true);

    try {
      const token = localStorage.getItem("token");

      // Format the date for the API
      const formattedDate = newDate.toISOString();

      const res = await fetch(`http://localhost:3001/api/appointments/${selectedAppointment.id || selectedAppointment._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          appointment_date: formattedDate,
          appointment_time: newTime
        })
      });

      const data = await res.json();

      if (data.success) {
        // Update the appointment in the local state
        setAppointments(prev => prev.map(app => {
          if ((app.id === selectedAppointment.id) || (app._id === selectedAppointment._id)) {
            return {
              ...app,
              appointment_date: formattedDate,
              appointment_time: newTime
            };
          }
          return app;
        }));

        alert("Appointment rescheduled successfully.");
        setRescheduleDialogOpen(false);
      } else {
        alert(`Failed to reschedule appointment: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error rescheduling appointment:", err);
      alert("Error rescheduling appointment. Please try again.");
    } finally {
      setIsRescheduling(false);
    }
  };

  // IMPORTANT: Fix date comparison to handle ISO strings properly
  const currentDate = new Date();

  const upcomingAppointments = appointments.filter(app => {
    const appDate = new Date(app.appointment_date);
    return appDate >= currentDate;
  });

  const pastAppointments = appointments.filter(app => {
    const appDate = new Date(app.appointment_date);
    return appDate < currentDate;
  });

  // Simplified function that doesn't depend on finding doctors
  const processAppointments = (appointmentsList) => {
    return appointmentsList.map(app => {
      // Try to find the doctor if available
      const doctor = doctors && doctors.length > 0
        ? doctors.find(doc => String(doc._id) === String(app.doctor_id))
        : null;

      // Create appointment data with or without doctor info
      return {
        // Doctor info if available, otherwise fallback values
        name: doctor ? doctor.name : `Doctor #${app.doctor_id}`,
        speciality: doctor ? doctor.speciality : "Information unavailable",
        address: doctor ? doctor.address : "Address unavailable",
        image: doctor ? doctor.image : "/placeholder.svg",

        // Appointment info
        date: new Date(app.appointment_date).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'long', year: 'numeric'
        }),
        time: app.appointment_time,
        status: app.status,
        appointmentId: app.id || app._id,
        doctor_id: app.doctor_id,

        // Keep the original appointment data for rescheduling
        ...app
      };
    });
  };

  const dataToShow = activeTab === 'MyAppointments'
    ? processAppointments(upcomingAppointments)
    : processAppointments(pastAppointments);

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
<<<<<<< HEAD
        {dataToShow.map((item) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={item.appointmentId}>
            <div>
              <img className='w-32' src={item.image} alt={item.name} />
=======
        {isLoading ? (
          <p className="py-8 text-center">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="py-8 text-center text-zinc-500">No appointments found.</p>
        ) : dataToShow.length === 0 ? (
          <p className="py-8 text-center text-zinc-500">
            {activeTab === 'MyAppointments'
              ? "No upcoming appointments."
              : "No past appointments."}
          </p>
        ) : (
          dataToShow.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={index}>
              <div>
                <img className='w-32 h-32 object-cover rounded' src={item.image || "/placeholder.svg"} alt={item.name} />
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
                <p className='text-xs mt-1'>
                  <span className='text-xs text-neutral-700 font-medium'>Status: </span>
                  {item.status}
                </p>
              </div>

              {activeTab === 'MyAppointments' && (
                <div className='flex flex-col justify-end gap-2'>
                  <button
                    onClick={() => openRescheduleDialog(item)}
                    className='text-sm text-primary text-center sm:min-w-48 py-2 border border-primary rounded hover:bg-primary hover:text-white transition-all duration-300'>
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancel(item.appointmentId)}
                    className='text-sm text-red-600 text-center sm:min-w-48 py-2 border border-red-600 rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                    Cancel Appointment
                  </button>
                </div>
              )}
>>>>>>> b8416c2e4796d67a9057b01d4a2a3e5541e95a32
            </div>
          ))
        )}
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time for your appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Select Date
              </label>
              <CalendarComponent
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                className="rounded-md border"
              />
            </div>

<<<<<<< HEAD
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
=======
            <div className="grid gap-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Select Time
              </label>
              <Select value={newTime} onValueChange={setNewTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
>>>>>>> b8416c2e4796d67a9057b01d4a2a3e5541e95a32
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReschedule}
              disabled={isRescheduling || !newDate || !newTime}
              className="bg-primary text-white hover:bg-primary/90"
            >
              {isRescheduling ? "Rescheduling..." : "Confirm Reschedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAppointments;