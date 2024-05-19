import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>FlexJobs</h1>
    <Outlet/>
    </>
  )
}

export default App
