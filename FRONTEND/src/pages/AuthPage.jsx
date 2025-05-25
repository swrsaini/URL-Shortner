import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'


const AuthPage = () => {
  const [login,setLogin] = useState(true)
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-amber-50">
      {login ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin} />}
      
    </div>
  )
}

export default AuthPage
