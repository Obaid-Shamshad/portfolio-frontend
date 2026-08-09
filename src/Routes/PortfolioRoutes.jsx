import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Home from '../Pages/Portfolio/Home'
import About from '../Pages/Portfolio/About'
import WebSkill from '../Pages/Portfolio/WebSkill'
import Contact from '../Pages/Portfolio/Contact'
import Login from '../Pages/Portfolio/Login'
import { Routes, Route } from 'react-router-dom'
import Project from '../Pages/Portfolio/Project'
import Notfound from '../components/Notfound'
import ForgetPass from '../Pages/Portfolio/ForgetPass'
import ScrollToView from '../components/ScrollToView'
import { getProfile } from '../api/profileAPI'

function PortfolioRoutes({ setIsLoggedIn }) {
    const [profile, setProfile] = useState([])
    console.log("Profile state:", profile)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile()
                setProfile(response.data.profile)
                console.log("Profile data fetched:", response.data.profile)
            } catch (error) {
                console.error('Error fetching profile:', error)
            }
        }

        fetchProfile()
    }, [])

    return (
        <>
            <ScrollToView />
            <Routes>
                <Route path="*" element={<Notfound />} />
                <Route path="/" element={<> <Nav />
                    <Home profile={profile} />
                    <About profile={profile} />
                    <WebSkill />
                    <Project profile={profile} />
                    <Contact profile={profile} /></>} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/forgot-password" element={<ForgetPass />} />
            </Routes>
        </>
    )
}

export default PortfolioRoutes
