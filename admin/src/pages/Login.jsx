import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (state === 'Admin') {
        // Admin login
        const response = await axios.post('http://localhost:3001/api/admin/login', {
          email,
          password
        });

        if (response.data.success) {
          // Store token in localStorage
          localStorage.setItem('aToken', response.data.token);

          // Update admin context
          // setAdmin({
          //   id: response.data.admin.id,
          //   email: response.data.admin.email,
          //   isAuthenticated: true
          // });

          // Redirect to admin dashboard
          navigate('/admin/Dashboard');
        } else {
          setError(response.data.message || 'Login failed');
        }
      } else {
        // Doctor login - implement this part based on your doctor login API
        const response = await axios.post('http://localhost:3001/api/doctors/login', {
          email,
          password
        });

        if (response.data.success) {
          // Store token in localStorage
          localStorage.setItem('doctorToken', response.data.token);

          // Redirect to doctor dashboard
          navigate('/doctor/dashboard');
        } else {
          setError(response.data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response?.data?.message ||
        'An error occurred during login. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 m-auto border p-8 min-w-[340px] sm:min-w-96 rounded-xl shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#00A0C6]">{state}</span> Login
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-2">
            {error}
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button
          className={`bg-[#00A0C6] text-white w-full py-2 rounded-md text-base mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {state === 'Admin' ? (
          <p className="text-sm">
            Doctor Login?{' '}
            <span
              className="text-[#00A0C6] underline cursor-pointer"
              onClick={() => setState('Doctor')}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Admin Login?{' '}
            <span
              className="text-[#00A0C6] underline cursor-pointer"
              onClick={() => setState('Admin')}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;