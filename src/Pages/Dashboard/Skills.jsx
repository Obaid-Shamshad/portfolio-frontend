import React, { useState, useEffect } from 'react'
import { RiDeleteBinLine, RiFileEditLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { getSkills, deleteSkill } from '../../api/skillApi';
import { ToastContainer, toast } from 'react-toastify';
import Model from '../../components/Model';



function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModel, setIsOpenModel] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        setSkills(response.data.skills);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        const response = await deleteSkill(skillId);
        if (response.data.success) {
          toast.success('Skill deleted successfully');
          setSkills(skills.filter(skill => skill._id !== skillId));
        }
      } catch (error) {
        toast.error('Error deleting skill');
      }
    }
  };

  const Skeleton = () => {
    return (
      <div className="flex items-center justify-around p-2">
        <div className='flex flex-col gap-1 w-full'>
          <div className='h-10 animate-pulse bg-gray-300 [animation-delay:0ms]'></div>
          <div className='h-10 animate-pulse bg-gray-300 [animation-delay:100ms]'></div>
          <div className='h-10 animate-pulse bg-gray-300 [animation-delay:300ms]'></div>
          <div className='h-10 animate-pulse bg-gray-300 [animation-delay:400ms]'></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='lg:ml-64 p-1 sm:p-4'>
        <div className="w-full mt-20 p-2 bg-gray-50 border rounded-lg border-gray-200">
          <h1 className='text-2xl font-bold text-center p-4 border-b-2 border-gray-300 mb-2'>My Skills</h1>
          <Link to="/dashboard/add-skill" className="ml-4 mb-4 font-bold inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md p-2 px-4">Add +</Link>
          {loading ? (
            <div className="space-y-4">
              <Skeleton />
            </div>
          ) : (
            <div>
              {skills.length > 0 ? (
                <table className="w-full table-fixed border-collapse">
                  <thead className="bg-gray-100 border-b border-gray-300 ">
                    <tr>
                      <th className="w-1/4 text-left p-4">Name</th>
                      <th className="w-1/4 hidden sm:table-cell text-center p-4">Category</th>
                      <th className="w-1/4 hidden md:table-cell text-center p-4">Level</th>
                      <th className="w-1/4  text-center p-4">Options</th>
                    </tr>
                  </thead>

                  <tbody>
                    {skills.map((skill) => (
                      <tr key={skill._id} className="hover:shadow-[0px_0px_5px_gray] rounded-md">
                        <td className="p-4 text-lg font-semibold">{skill.name}</td>
                        <td className="p-4 hidden sm:table-cell text-center">{skill.category}</td>
                        <td className="p-4 hidden md:table-cell text-center">
                          <h1>{skill.level}%</h1>
                          <div className="w-full bg-gray-200 h-2 rounded">
                            <div className="bg-blue-500 h-2 rounded" style={{ width: `${skill.level}%` }}></div>
                          </div>
                        </td>

                        <td className="p-4 flex justify-center items-center space-x-2">
                          <Link to={`/dashboard/edit-skill/${skill._id}`} className="flex gap-1 items-center cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-2 rounded">
                            <RiFileEditLine /> <span className="hidden sm:inline">Edit</span>
                          </Link>

                          <button onClick={() => setIsOpenModel(true)} className="flex gap-1 items-center cursor-pointer bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-3 py-2 rounded">
                            <RiDeleteBinLine /> <span className="hidden sm:inline">Delete</span>
                          </button>
                           {isOpenModel && <Model setIsOpenModel={setIsOpenModel} deleteData={() => handleDelete(skill._id)} />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>) : (
                <h1 className='text-center text-taupe-500 italic text-lg font-semibold p-4'>No skills found. Please add some skills.</h1>
              )}
            </div>)}
        </div>
      </div>
      <ToastContainer />

    </>
  )
}

export default Skills
