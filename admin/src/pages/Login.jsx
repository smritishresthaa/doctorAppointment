import React, { useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Admin') {



      } else {

      }

    } catch (error) {

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-3 m-auto border p-8 min-w-[340px] sm:min-w-96 rounded-xl shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#00A0C6]">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button
          className="bg-[#00A0C6] text-white w-full py-2 rounded-md text-base mt-2"
          type="submit"
        >
          Login
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

