import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
  <>
  <div className='p-4 fixed top-0 left-0 w-full z-30 bg-gray-700 flex justify-around'>
      <h1 className='text-xl text-pink-600 font-semibold'>My-portfolio</h1>
      <div className='hidden sm:flex gap-2 md:space-x-8 text-white'>
        <Link to="/#home" className='nav-link'>Home</Link>
        <Link to="/#about" className='nav-link'>About</Link>
        <Link to="/#skills" className='nav-link'>Skills</Link>
        <Link to="/#projects" className='nav-link'>Projects</Link>
        <Link to="/#contact" className='nav-link'>Contact</Link>
      </div>
  </div>
  </>
  )
}

export default Nav
