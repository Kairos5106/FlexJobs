import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import React from 'react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Outlet/>
    
    </>
  )
}

export default App
