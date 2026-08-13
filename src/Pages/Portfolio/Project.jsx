import React, { useEffect, useState } from 'react'
import Pcard from '../../components/Pcard';
import { getProjects } from '../../api/projectApi';

function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {projects.length > 0 && (
        <div className='flex min-h-screen xl:py-12 xl:min-h-auto flex-col bg-gray-700' id="projects">
          <div className='h-60 w-full flex justify-center items-center'>
            <h1 className='text-3xl font-bold text-white text-shadow-lg text-shadow-black border-b-2 border-gray-500 w-3/4 text-center py-8'>My <span className='text-red-500'> Projects</span></h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:px-12 lg:px-24 justify-items-center">
            {projects.map((project) => (
              <Pcard key={project._id} project={project} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Project
