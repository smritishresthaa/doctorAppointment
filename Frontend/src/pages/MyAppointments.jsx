"use client"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [rescheduleId, setRescheduleId] = useState(null)
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming") // Default tab is upcoming

  const availableTimeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } },
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to toggle reschedule form
  const toggleReschedule = (appointmentId) => {
    if (rescheduleId === appointmentId) {
      setRescheduleId(null)
      setNewDate("")
      setNewTime("")
    } else {
      setRescheduleId(appointmentId)
      setNewDate("")
      setNewTime("")
    }
  }

  // Function to handle appointment rescheduling
  const rescheduleAppointment = async (appointmentId) => {
    if (!newDate || !newTime) {
      toast.error("Please select both date and time")
      return
    }

    try {
      // Format date from YYYY-MM-DD to DD_MM_YYYY
      const [year, month, day] = newDate.split("-")
      const formattedDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        backendUrl + "/api/user/reschedule-appointment",
        {
          appointmentId,
          newDate: formattedDate,
          newTime,
        },
        { headers: { token } },
      )

      if (data.success) {
        toast.success(data.message || "Appointment rescheduled successfully")
        setRescheduleId(null)
        setNewDate("")
        setNewTime("")
        getUserAppointments()
      } else {
        toast.error(data.message || "Failed to reschedule appointment")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || "An error occurred while rescheduling")
    }
  }

  // Filter appointments based on active tab
  const getFilteredAppointments = () => {
    const currentDate = new Date()

    // Helper function to convert slot date to Date object
    const getAppointmentDate = (appointment) => {
      const [day, month, year] = appointment.slotDate.split("_")
      return new Date(`${year}-${month}-${day}`)
    }

    switch (activeTab) {
      case "upcoming":
        return appointments.filter((appointment) => {
          const appointmentDate = getAppointmentDate(appointment)
          return !appointment.cancelled && !appointment.isCompleted && appointmentDate >= currentDate
        })
      case "past":
        return appointments.filter((appointment) => {
          const appointmentDate = getAppointmentDate(appointment)
          return !appointment.cancelled && (appointment.isCompleted || appointmentDate < currentDate)
        })
      case "cancelled":
        return appointments.filter((appointment) => appointment.cancelled)
      default:
        return appointments
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My appointments</p>

      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium ${activeTab === "upcoming" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "past" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === "cancelled" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
      </div>

      <div className="">
        {getFilteredAppointments().length === 0 ? (
          <div className="text-center py-8 text-gray-500">No {activeTab} appointments found.</div>
        ) : (
          getFilteredAppointments().map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
              <div>
                <img className="w-36 bg-[#EAEFFF]" src={item.docData.image || "/placeholder.svg"} alt="" />
              </div>
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p className="">{item.docData.address.line1}</p>
                <p className="">{item.docData.address.line2}</p>
                <p className=" mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end text-sm text-center">
                {/* Show reschedule button only for upcoming appointments */}
                {activeTab === "upcoming" && !item.cancelled && !item.isCompleted && (
                  <>
                    <button
                      onClick={() => toggleReschedule(item._id)}
                      className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      {rescheduleId === item._id ? "Cancel" : "Reschedule"}
                    </button>

                    {rescheduleId === item._id && (
                      <div className="mt-2 p-3 border rounded bg-gray-50">
                        <div className="mb-2">
                          <label className="block text-sm font-medium mb-1">New Date:</label>
                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium mb-1">New Time:</label>
                          <select
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select time</option>
                            {availableTimeSlots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={() => rescheduleAppointment(item._id)}
                          className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition-all duration-300"
                        >
                          Confirm Reschedule
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Payment status */}
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]">Paid</button>
                )}

                {/* Completed status */}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>
                )}

                {/* Cancel button - only show for upcoming appointments */}
                {activeTab === "upcoming" && !item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel appointment
                  </button>
                )}

                {/* Cancelled status */}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyAppointments
