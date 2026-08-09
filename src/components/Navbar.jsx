import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from '../api/userApi';
import { useNavigate } from 'react-router-dom';


function Navbar({ isOpenSidebar, setIsOpenSidebar, setIsLoggedIn }) {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let response = await logout();
      if (response.data.success) {
        localStorage.removeItem('userId');
        navigate('/');
        setIsLoggedIn(false);
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }

  }

  return (
    <>
      <div className='fixed top-0 left-0 w-full h-16 bg-gray-100 text-gray-800 flex items-center justify-between px-2 sm:px-20 shadow-sm shadow-gray-300 z-50'>
        <button onClick={() => setIsOpenSidebar(!isOpenSidebar)} className='lg:hidden text-2xl font-bold text-gray-800  hover:text-gray-500 transition-all duration-300 cursor-pointer border border-gray-300 p-2 rounded-md hover:shadow-[0_0_5px_gray]'>
          <GiHamburgerMenu />
        </button>
        <h1 className='text-xl text-purple-800 font-bold'>Portfolio</h1>
        <button onClick={handleLogout} className='flex items-center gap-1 text-gray-800 font-semibold hover:text-red-500 transition-colors duration-300 cursor-pointer'>
          logout
          <FaLongArrowAltRight />
        </button>
      </div>
    </>
  )
}

export default Navbar
