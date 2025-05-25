import React from 'react'
import { Link } from '@tanstack/react-router'

const Navbar = () => (
  <nav className="bg-blue-600 px-4 py-3 flex items-center justify-between">
    <div className="text-white font-bold text-xl">
      <Link to="/">URL Shortener</Link>
    </div>
    <div className="space-x-4">
      <Link to="/" className="text-white hover:underline">Home</Link>
      <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
      <Link to="/auth" className="text-white hover:underline">Login</Link>
    </div>
  </nav>
)

export default Navbar