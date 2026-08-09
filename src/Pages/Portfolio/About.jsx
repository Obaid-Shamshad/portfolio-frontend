import React from 'react'

function About({ profile }) {
  return (
    <>

      <div className="min-h-screen flex flex-col bg-gray-700" id="about">
        <div className='w-full h-60 flex justify-center items-center'>
          <h1 className='text-3xl font-bold text-gray-200 text-shadow-lg text-shadow-black border-b-2 border-gray-500 py-8 w-3/4 text-center'>About <span className='text-red-500'>me</span></h1>
        </div>
        <div className='flex flex-col md:flex-row md:justify-around md:items-center'>
          <div className='md:w-1/3 flex justify-center items-center md:border-r-2 md:border-red-800 p-4'>
            <img src={profile[0]?.profilePicture || "./B6B.jpg"} alt="Profile" className='w-62 aspect-3.5/4 object-cover rounded-full border-2 border-red-700 shadow-[0_0_50px_red]' />
          </div>
          <div className='md:w-1/2 p-4'>
            <h1 className='text-white text-xl mb-8'>MERN Stack <span className='text-red-500'>Developer</span></h1>
            <p className='text-gray-100'>{profile[0]?.about}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
