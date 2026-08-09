import React from 'react'
import { FiDownload } from "react-icons/fi";

function Home({ profile }) {

    const url = profile[0]?.cvURL;
    const downloadUrl = url?.replace('/upload/', '/upload/fl_attachment/');

    return (
        <>
            <div className='flex min-h-screen flex-col md:flex-row md:items-center justify-around  bg-gray-700' id="home">
                <div className='md:w-1/2 order-2 md:order-1 m-4 '>
                    <h1 className='text-3xl text-gray-300'>Hi,</h1>
                    <p className='text-3xl text-gray-300'>I am <span className='text-3xl font-semibold text-fuchsia-600'>Obaid Ur Rehman</span></p>
                    <div className='w-fit mt-4'>
                        <p className='text-xl sm:text-3xl typing text-gray-300 inline-block'><span className='text-3xl bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent'>MERN </span>Stack Developer</p>
                    </div>
                    <p className='mt-10 text-white'>{profile[0]?.bio}</p>
                    <a href={downloadUrl} download className='flex w-fit items-center p-2 bg-fuchsia-700 text-white font-semibold mt-6 rounded-sm cursor-pointer hover:bg-fuchsia-800 transition-all duration-150 active:bg-purple-900' title='cv'>Download CV <FiDownload className='text-xl text-fuchsia-300' /></a>
                </div>
                <div className='md:w-1/3 mt-20 md:mt-0 m-4 order-1 lg:flex lg:justify-center'>
                    <div className='max-w-62 z-10  rounded-full bg-amber-600 relative profilePic '>
                        <img src={profile[0]?.profilePicture || "./B6B.jpg"} alt="Profile" className='w-full aspect-3.5/4 bg-gray-300 rounded-full object-cover' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
