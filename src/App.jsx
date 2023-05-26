import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Router from "@/routes";

function App() {
  const [count, setCount] = useState(0)

  const setting = () => {
    localStorage.setItem("type", "user");
  }

  return (
    <>
      <button onClick={setting}>AA</button>
      <Router />
    </>
  )
}

export default App
