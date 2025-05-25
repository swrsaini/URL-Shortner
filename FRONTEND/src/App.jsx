import React from 'react'
import HomePage from './pages/HomePage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/navBar'




const App = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default App
