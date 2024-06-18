import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

export default function Login() {
  // Error state
  const [error, setError] = useState(null);

  // Handle the user input
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Check if the user exists
      const user = await axios.post(`http://localhost:4000/users/login`, formData);
      // Save the user's token in local storage
      console.log(user.data.data.message)
      localStorage.setItem('token', user.data.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      setError(error);
      console.log("Error message::", error);
    }
  };

  return (
    <section className='flex flex-col lg:flex-row justify-center items-center w-[100vw] h-[100vh]'>
     
  
      <div className='flex flex-col justify-center items-center w-full lg:w-1/2 p-8'>
        <h1 className='text-2xl font-bold text-indigo-700 mb-4'>Sign in</h1>
       
        
        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-4'>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            className='py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            className='py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'
          />
          
          <button
            type="submit"
            className='w-full bg-indigo-700 text-white py-3 rounded-md hover:bg-indigo-600 font-bold text-xl'
          >
            Continue
          </button>
        </form>
        
        <p className='mt-4'>Already have an account? <Link to="/register" className='text-indigo-700'>Sign up</Link></p>
        {error && <Alert msg={error.response.data.message} />}
      </div>
    </section>
  );
}
