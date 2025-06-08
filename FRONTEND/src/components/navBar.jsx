import React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slice/authSlice'
import { logoutUser } from '../api/user.api'

const Navbar = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate({ to: '/' });
  }

  return (
    <nav className="bg-blue-600  px-4 py-3 flex items-center justify-between">
      <div className="text-white font-bold text-xl">
        <Link to="/">URL Shortener</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-white hover:underline">Home</Link>
        <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
        {auth.isAuthenticated ? (
          <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
        ) : (
          <Link to="/auth" className="text-white hover:underline">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar