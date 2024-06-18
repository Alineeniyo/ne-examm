import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './app/Login'
import Display from './app/Display'
import Create from './app/Create'
import NotFound from './app/NotFound'
import Search from './app/search'
import Register from './app/Register'
import AuthRoute from './routes/AuthRoute'
export default function App() {
  return (
    <BrowserRouter>
    {/* <Routes>
      <Route index element={<Login />} />
      
        <Route element={<AuthRoute />}>
            <Route path="/dashboard" element={<Display />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />} />
          </Route>
          
         
        <Route path="/register" element={<Register />} />
       
      <Route path="*" element={<NotFound />} />
    </Routes> */}

    <Routes>
      <Route index element={<Login />} />
      
        
        <Route path="/dashboard" element={<Display />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} /> 
        <Route path="/register" element={<Register />} />
       
        <Route path="*" element={<NotFound />} />

    </Routes>
    </BrowserRouter>
  )
}
