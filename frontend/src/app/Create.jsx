import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Create() {
    const navigate = useNavigate()
    //handle change
    const [formData, setformData] = useState({})
    const handleChange = (e) =>{
        setformData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    
    //handle submit
    const handleSubmit =async (e)=>{
        e.preventDefault();
        
        try {
         //check if the user exist
         const user = await axios.post(`http://10.5.222.72:3000/employees/create`, formData);
         navigate('/dashboard')

        } catch (error) {
          console.log("Error message::", error);
        }
     }

  return (
    <section className='flex flex-col justify-center items-center w-[100vw] h-full p-4 gap-4'>
       <h1 className='text-2xl font-bold text-blue-900'>Insert new Employee</h1>
       <form onSubmit={handleSubmit} className='flex flex-col w-[60%] gap-4'>
         <input onChange={handleChange} type="text" placeholder="Enter id"  name="id"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Firstname"  name="firstname"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Lastname"  name="lastname"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter National Id"  name="national_ID"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Telephone"  name="telephone"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Email"  name="email"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Department"  name="department"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Position"  name="position"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Laptop"  name="laptop"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Manufacture"  name="manufacture"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Model"  name="model"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         <input onChange={handleChange} type="text" placeholder="Enter Serial Number"  name="serialNumber"  className='py-4 px-2 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
         {/* Button */}
         <button type="submit" className='w-full bg-blue-900 text-white py-4 rounded-md hover:opacity-75 font-bold text-xl'>Add new</button>
       </form>
    </section>
  )
}
