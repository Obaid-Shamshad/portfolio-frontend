import React from 'react'

function About({ profile }) {

   const Skeleton = () => {
        return (
            <div className="space-y-4 mt-10">
                <div className="h-2 w-full rounded animate-pulse bg-gray-500 [animation-delay:0ms]"></div>
                <div className="h-2 w-full rounded animate-pulse bg-gray-500 [animation-delay:200ms]"></div>
                <div className="h-2 w-2/3 rounded animate-pulse bg-gray-500 [animation-delay:400ms]"></div>
                <div className="h-2 w-1/2 rounded animate-pulse bg-gray-500 [animation-delay:600ms]"></div>
            </div>
        );
    };

  return (
    <>

      <div className="min-h-screen xl:min-h-auto xl:py-12 flex flex-col bg-gray-700" id="about">
        <div className='w-full h-60 flex justify-center items-center'>
          <h1 className='text-3xl font-bold text-gray-200 text-shadow-lg text-shadow-black border-b-2 border-gray-500 py-8 w-3/4 text-center'>About <span className='text-red-500'>me</span></h1>
        </div>
        <div className='flex flex-col md:flex-row md:justify-around md:items-center'>
          <div className='md:w-1/3 flex justify-center items-center md:border-r-2 md:border-red-800 p-4'>
            <img src={profile[0]?.profilePicture || "./B6B.jpg"} alt="Profile" className='w-62 aspect-3.5/4 object-cover rounded-full border-2 border-red-700 shadow-[0_0_50px_red]' />
          </div>
          <div className='md:w-1/2 p-4'>
            <h1 className='text-white text-xl mb-8'>MERN Stack <span className='text-red-500'>Developer</span></h1>
            {profile[0]?.about ? (
                <p className='text-gray-100'>{profile[0]?.about}</p>
            ) : (
                <Skeleton />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default About
