import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import AllAppointments from './pages/Admin/AllAppointments'
import Dashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <ToastContainer />

      <div className="flex items-start">
        {!isLoginPage && <Sidebar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointmnets" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
