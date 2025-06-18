import { useState } from 'react'
import reactLogo from './assets/logo.png'
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
import Home from './Home'
import viteLogo from '/vite.svg'
import Topnavigationbar from '../Navigationbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
