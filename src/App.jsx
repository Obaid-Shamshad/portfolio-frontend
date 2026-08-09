import React, {useState, useEffect} from 'react'
import PortfolioRoutes from './Routes/PortfolioRoutes'
import DashboardRoutes from './Routes/DashboardRoutes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notfound from './components/Notfound'
import { checkLogin } from './api/userApi'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await checkLogin()
        if (response.data.success) {
          setIsLoggedIn(true)
          setLoading(false)
        } else {
          setIsLoggedIn(false)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error checking login status:', error)
        setIsLoggedIn(false)
        setLoading(false)
      }
      
    }

    verifyLogin()
  }, [])

  if(loading) {
    return <div className='flex justify-center items-center h-screen text-2xl opacity-20 italic'>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<Notfound />} /> */}
        <Route path="/*" element={<PortfolioRoutes setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/dashboard/*" element={isLoggedIn ? <DashboardRoutes setIsLoggedIn={setIsLoggedIn}/> : <Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
 