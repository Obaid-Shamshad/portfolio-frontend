import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { RiDeleteBinLine, RiFileEditLine } from "react-icons/ri";
import { getProjects, deleteProject } from '../../api/projectApi';
import { ToastContainer, toast } from 'react-toastify';
import Model from '../../components/Model';


function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpenModel, setIsOpenModel] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data.projects);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId) => {
        try {
            const response = await deleteProject(projectId);
            if (response.data.success) {
                setProjects(projects.filter(project => project._id !== projectId));
                toast.success('Project deleted successfully');
            }
        } catch (error) {
            toast.error('Error deleting project');
        }
    };

    const Skeleton = () => {
        return (
            <div className="flex items-center justify-between border border-gray-300 p-2 px-12">
                <div className='w-2/6 animate-pulse flex items-center gap-4 [animation-delay:0ms]'>
                    <div className="w-14">
                        <div className="w-12 h-12 bg-gray-300"></div>
                    </div>
                    <div className='w-full animate-pulse space-y-2 [animation-delay:200ms]'>
                        <div className="h-2 w-full  bg-gray-300"></div>
                        <div className="h-2 w-1/2  bg-gray-300"></div>
                    </div>
                </div>
                <div className="w-1/6 flex gap-1 items-center rounded animate-pulse [animation-delay:400ms]">
                    <div className="h-10 w-full bg-gray-300"></div>
                    <div className="h-10 w-full bg-gray-300"></div>
                </div>

            </div>
        );
    };

    return (
        <>
            <div className='lg:ml-64 p-1 lg:p-4'>
                <div className="w-full mt-20 p-2 bg-gray-50 border rounded-lg border-gray-200">
                    <h1 className='text-2xl font-bold text-center p-4 border-b-2 border-gray-300 mb-2'>My Projects</h1>
                    <Link to="/dashboard/add-project" className="ml-4 mb-4 font-bold inline-block bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md p-2 px-4">Add +</Link>
                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </div>
                    ) : (
                        <div>
                            {projects.length > 0 ? (
                                <table className="w-full table-fixed border-collapse">
                                    <thead className="bg-gray-100 border-b border-gray-300 ">
                                        <tr>
                                            <th className="w-1/4 text-left p-4">Name</th>
                                            <th className="w-1/4 text-center p-4">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((project) => (
                                            <tr key={project._id} className="hover:shadow-[0px_0px_5px_gray] rounded-md">
                                                <td className="p-4">
                                                    <div className="flex items-center space-x-4 rounded-lg">
                                                        <div className="hidden sm:block w-12 h-12 bg-gray-300 rounded-lg overflow-hidden">
                                                            <div className="flex h-full items-center justify-center">
                                                                <img src={project.projectUrl} alt="Project Image" crossOrigin="anonymous" className="w-full h-full object-cover" />
                                                            </div>
                                                        </div>
                                                        <h1 className="text-lg font-semibold">{project.title}</h1>

                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <Link to={`/dashboard/edit-project/${project._id}`} className="flex gap-1 items-center bg-blue-500 cursor-pointer text-white px-3 py-2 rounded hover:bg-blue-600 active:bg-blue-700">
                                                            <RiFileEditLine /> <span className="hidden sm:inline">Edit</span>
                                                        </Link>
                                                        <button onClick={() => setIsOpenModel(true)} className="flex gap-1 items-center bg-red-500 text-white px-3 py-2 cursor-pointer rounded hover:bg-red-600 active:bg-red-700">
                                                            <RiDeleteBinLine /> <span className="hidden sm:inline">Delete</span>
                                                        </button>
                                                        {isOpenModel && <Model setIsOpenModel={setIsOpenModel} deleteData={() => handleDeleteProject(project._id)} />
                                                      }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>) : (
                                <h1 className='text-center text-taupe-500 italic text-lg font-semibold p-4'>No projects found. Please add some projects.</h1>
                            )}
                        </div>)}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Projects
