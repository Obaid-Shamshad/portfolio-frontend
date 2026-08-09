import React from 'react'
import { HiOutlineLink } from "react-icons/hi";

function Pcard({ project }) {
    return (
        <>

            <div className='max-w-98 w-full flex flex-col h-auto relative bg-gray-700 rounded-lg shadow-[0_0_5px_2px_gray] p-2 hover:scale-102 transition-all duration-500 hover:shadow-[0_0_25px_2px_gray]'>
                <div className=' w-full aspect-7/8 bg-gray-300 rounded-md'>
                    <img src={project?.projectUrl} alt="project image" className='w-full h-full  object-cover rounded-md' />
                </div>
                <h1 className="text-white text-xl font-bold py-2">{project?.title}</h1>
                <p className="text-gray-300 mb-10">{project?.description}</p>
                <div className='flex justify-between w-full absolute bottom-1 left-0 p-2'>
                    <div className="flex items-center text-gray-200 gap-1 ">
                        <HiOutlineLink /> <a href={project?.liveLink} className="text-blue-500 cursor-pointer hover:underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">Live Demo</a>
                    </div>
                    <div className="flex items-center text-gray-200 gap-1 ">
                        <HiOutlineLink /> <a href={project?.githubLink} className="text-blue-500 cursor-pointer hover:underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Pcard
