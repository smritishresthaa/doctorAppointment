import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (state === 'Sign Up') {
        const response = await axios.post('http://localhost:3001/api/auth/register', {
          full_name: name,
          email,
          password,
          phone,
          gender,
          dob,
          address_line: addressLine
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          window.dispatchEvent(new Event("storage"));
          navigate('/');
        } else {
          setState('Login');
          alert('Registration successful! Please login.');
        }
      } else {
        const response = await axios.post('http://localhost:3001/api/auth/login', {
          email,
          password
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          window.dispatchEvent(new Event("storage"));
          navigate('/');
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='min-h-[80vh] flex justify-center items-center' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6 p-8 min-w-[380px] border rounded-xl shadow-lg text-sm text-zinc-600'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book an appointment</p>

        {error && <div className="text-red-600">{error}</div>}

        {state === "Sign Up" && (
          <>
            <input placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} required />
            <input placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} required />
            <input placeholder='Address' value={addressLine} onChange={(e) => setAddressLine(e.target.value)} required />
          </>
        )}

        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type='submit' disabled={loading} className='bg-primary text-white py-2 rounded-md'>
          {loading ? 'Please wait...' : (state === 'Sign Up' ? 'Register' : 'Login')}
        </button>

        <p>
          {state === "Sign Up" ? "Already have an account?" : "New here?"}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className='text-primary underline cursor-pointer ml-1'
          >
            {state === "Sign Up" ? "Login here" : "Register"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;