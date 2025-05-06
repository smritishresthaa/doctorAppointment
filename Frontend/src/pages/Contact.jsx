import React, { useState } from 'react';
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-semibold text-gray-700 mb-10">Contact Us</h1>
      
      <div className="flex flex-col md:flex-row gap-12 mt-12">
        {/* Left Column - Contact Information */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Get in Touch</h2>
          <p className="text-gray-500 mb-8">Have questions? We're here to help!</p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                <span className="text-pink-500 text-lg">📍</span>
              </div>
              <div>
                <h3 className="text-[#00A0C6] font-medium mb-1">Location</h3>
                <p className="text-gray-600">Kathmandu, Nepal</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                <span className="text-pink-500 text-lg">📞</span>
              </div>
              <div>
                <h3 className="text-[#00A0C6] font-medium mb-1">Phone</h3>
                <p className="text-gray-600">+977-987654321</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                <span className="text-pink-500 text-lg">✉️</span>
              </div>
              <div>
                <h3 className="text-[#00A0C6] font-medium mb-1">Email</h3>
                <p className="text-gray-600">info@doctorsathi.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-medium text-gray-700 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
              <input 
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Please fill out this field!</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            
            <button 
              type="submit"
              className="bg-[#00A0C6] text-white px-6 py-2 rounded-md hover:bg-[#0089AB] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
