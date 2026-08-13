import React, { useState, useEffect } from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { getProfile } from '../api/profileAPI';


function Sidebar({ isOpenSidebar, setIsOpenSidebar }) {
    const [isOpen, setIsOpen] = useState(false)
    const [profileData, setProfileData] = useState(null)

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await getProfile();
            if (response.data.success) {
                setProfileData(response.data.profile);
            }
        };
        fetchProfileData();
    }, []);

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);

    }

    const Skeleton = () => {
        return (
            <div className="flex items-center gap-2">
                <div className='w-10 h-10 flex justify-center items-center'>
                    <div className="h-10 w-10 rounded-full animate-pulse bg-gray-300 [animation-delay:0ms]"></div>
                </div>
                <div className="w-full space-y-2">
                    <div className="h-2 w-1/2 rounded animate-pulse bg-gray-300 [animation-delay:200ms]"></div>
                    <div className="h-2 w-3/4 rounded animate-pulse bg-gray-300 [animation-delay:400ms]"></div>
                </div>

            </div>
        );
    };

    return (
        <>
            <div className={`fixed top-14 lg:left-0 ${isOpenSidebar ? 'left-0' : '-left-72'} w-64 h-full bg-gray-100 text-gray-800 shadow-lg  shadow-gray-800 z-40 transition-all duration-300`}>
                <ul className='py-4'>
                    <div>
                        <li className='px-4 py-5 mb-2 '>
                            <div>
                                {profileData && profileData.length > 0 ? (
                                    <div className='flex items-center gap-3'>
                                        <img src={profileData[0]?.profilePicture} alt="Profile" className='w-10 h-10 rounded-full' />
                                        <div>
                                            <h2 className='font-bold'>{profileData[0]?.name}</h2>
                                            <p className='text-sm text-gray-600'>MERN Stack Developer</p>
                                        </div>
                                    </div>
                                ) : (
                                    <Skeleton />
                                )}
                            </div>
                        </li>
                        <div className="flex justify-center">
                            <hr className='mb-12 text-gray-400 w-[80%]' />
                        </div></div>
                    <NavLink to="/dashboard" end className={({ isActive }) => `${isActive ? "border-l-4 border-pink-500 rounded-lg bg-green-100" : ""} px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2 items-center`} onClick={toggleSidebar}><MdSpaceDashboard className='text-blue-700' />Dashboard</NavLink>
                    <NavLink to="/dashboard/skills" className={({ isActive }) => `${isActive ? "border-l-4 border-pink-500 rounded-lg bg-green-100" : ""} px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2 items-center`} onClick={toggleSidebar}>
                        <GiSkills className='text-pink-700' />Skills
                    </NavLink>
                    <NavLink to="/dashboard/projects" className={({ isActive }) => `${isActive ? "border-l-4 border-pink-500 rounded-lg bg-green-100" : ""} px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2 items-center`} onClick={toggleSidebar}>
                        <GrProjects className='text-orange-700' />Projects
                    </NavLink>
                    <li>
                        <div className='px-4 py-2 hover:bg-gray-200 cursor-pointer flex gap-2 items-center justify-between' onClick={handleOpen}>
                            <h1 className='flex gap-2 items-center'><IoSettings className='text-amber-800' />Settings</h1>
                            {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        </div>
                        <ul className={`pl-8 ${isOpen ? 'h-32' : 'h-0'} flex flex-col gap-2 overflow-hidden transition-all duration-300`}>
                            <NavLink to="/dashboard/change-password" className={({ isActive }) => `${isActive ? "border-l-4 border-pink-500 rounded-lg bg-green-100" : ""} px-4 py-1 hover:bg-gray-200 cursor-pointer`} onClick={toggleSidebar}>
                                Change Password
                            </NavLink>
                            <NavLink to="/dashboard/update-profile" className={({ isActive }) => `${isActive ? "border-l-4 border-pink-500 rounded-lg bg-green-100" : ""} px-4 py-1 hover:bg-gray-200 cursor-pointer`} onClick={toggleSidebar}>
                                Update profile
                            </NavLink>
                            <NavLink to="/dashboard/upload-cv" className={({ isActive }) => `${isActive ? "border-l-4 border-pink-500 rounded-lg bg-green-100" : ""} px-4 py-1 hover:bg-gray-200 cursor-pointer flex gap-2 items-center`} onClick={toggleSidebar}>
                                Upload CV<FaLongArrowAltRight />
                            </NavLink>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar
