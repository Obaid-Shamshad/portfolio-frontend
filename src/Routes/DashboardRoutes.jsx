import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Home from '../Pages/Dashboard/Home'
import Projects from '../Pages/Dashboard/Projects'
import { Routes, Route } from 'react-router-dom'
import EditProject from '../Pages/Dashboard/EditProject'
import Skills from '../Pages/Dashboard/Skills'
import NewProject from '../Pages/Dashboard/NewProject'
import NewSkill from '../Pages/Dashboard/NewSkill'
import EditSkill from '../Pages/Dashboard/EditSkill'
import Updateprofile from '../Pages/Dashboard/Updateprofile'
import ChangePassword from '../Pages/Dashboard/ChangePass'
import Notfound from '../components/Notfound'
import UploadCV from '../Pages/Dashboard/UploadCV'


function DashboardRoutes({ setIsLoggedIn }) {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);



    return (
        <>
            <Navbar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} setIsLoggedIn={setIsLoggedIn} />
            <Sidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
            <Routes>
                <Route path="*" element={<Notfound />} />
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/edit-project/:projectId" element={<EditProject />} />
                <Route path="/add-project" element={<NewProject />} />
                <Route path="/add-skill" element={<NewSkill />} />
                <Route path="/edit-skill/:skillId" element={<EditSkill />} />
                <Route path="/update-profile" element={<Updateprofile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/upload-cv" element={<UploadCV />} />
            </Routes>
        </>
    )
}

export default DashboardRoutes
