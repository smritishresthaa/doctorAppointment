import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ✅ ProtectedRoute definition
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path='/my-appointments' element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
        <Route path='/appointment/:docId' element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        {/* ✅ Added /profile route */}
        <Route path='/profile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
