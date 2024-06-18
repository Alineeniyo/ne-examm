import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

export default function Register() {
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

    try {
      // Check if the user exists
      const user = await axios.post(`http://localhost:4000/users/admin/register`, formData);
      navigate('/');
    } catch (error) {
      setError(error);
      console.log('Error message::', error);
    }
  };

  return (
    <section className='flex flex-col md:flex-row justify-center items-center w-full h-screen'>
      {/* Left Section */}
      <div className='bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex flex-col justify-center items-center w-full md:w-1/2 h-1/2 md:h-full p-10'>
        <h1 className='text-4xl font-extrabold mb-5'>Join Our Community</h1>
        <p className='text-xl text-center'>
          Manage and control student information efficiently.
        </p>
      </div>

      {/* Right Section */}
      <div className='flex flex-col justify-center items-center w-full md:w-1/2 p-10'>
        <h1 className='text-3xl font-semibold text-indigo-700 mb-5'>Create Account</h1>
        <p className='mb-8 text-gray-700'>We're excited to have you!</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-lg gap-6'>
          <input type="text" placeholder="First Name" name="firstname" onChange={handleChange} className='py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-lg'/>
          <input type="text" placeholder="Last Name" name="lastname" onChange={handleChange} className='py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-lg'/>
          <input type="email" placeholder="Email Address" name="email" onChange={handleChange} className='py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-lg'/>
          <input type="password" placeholder="Password" name="password" onChange={handleChange} className='py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-lg'/>
          
          <button type="submit" className='w-full bg-indigo-700 text-white py-3 rounded-md hover:bg-indigo-600 font-bold text-lg'>Sign Up</button>
        </form>

        <p className='mt-5'>Already a member? <Link to="/" className='text-indigo-700 font-bold'>Log In</Link></p>
        {error && <Alert msg={error.response.data.error} />}
      </div>
    </section>
  );

}
