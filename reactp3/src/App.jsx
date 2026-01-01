import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Register from './Components/Registerpage/Register'
import Login from './Components/loginpage/Login'


const App = () => {
  return (
    <div>
      <Routes>
{/* 1.code for register page */}
<Route path='register' element={<Register/>}/>

{/* 2.code for login page */}
<Route path='/' element={<Login/>}/>




      </Routes>
    </div>
  )
}

export default App
