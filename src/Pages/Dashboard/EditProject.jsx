import React, { useEffect, useState } from 'react'
import { editProject, getProject } from '../../api/projectApi';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function EditProject() {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    liveLink: '',
    githubLink: '',
    projectImage: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {


        const response = await getProject(projectId);
        if (response.data.success) {
          setFormData({
            title: response.data.project.title,
            description: response.data.project.description,
            liveLink: response.data.project.liveLink,
            githubLink: response.data.project.githubLink,
            projectImage: null
          });
          document.getElementById('fileName').innerText = response.data.project.projectUrl.split('/').pop() || 'No file selected';
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProjectData();
  }, []);

  const handleShowName = (e) => {
    let fileName = document.getElementById('fileName');
    if (fileName) {
      const file = e.target.files[0];
      fileName.innerText = `${file.name.slice(0, 20)}...` || 'No file selected'; // Display the truncated file name
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('liveLink', formData.liveLink);
      formDataToSend.append('githubLink', formData.githubLink);
      if (formData.projectImage) {
        formDataToSend.append('projectImage', formData.projectImage);
      }
      const response = await editProject(projectId, formDataToSend);
      if (response.data.success) {
        navigate('/dashboard/projects');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error editing project');
    }
  }


  return (
    <>
      <div className="lg:ml-64 flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className='mt-20 p-4 shadow-[0_0_5px_gray] flex flex-col gap-3 w-100 rounded-lg'>
          <h1 className='text-xl font-semibold text-center py-2'>Edit Project</h1>
          <div className='flex flex-col gap-1'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={formData?.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" value={formData?.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className='border border-gray-400 h-20 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required></textarea>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="liveLink">Live Link</label>
            <input type="text" name="liveLink" id="liveLink" value={formData?.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="githubLink">GitHub Link</label>
            <input type="text" name="githubLink" id="githubLink" value={formData?.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required />
          </div>
          <div className='flex flex-col gap-1'>
            <h1>Upload image</h1>
            <div className="flex items-center gap-4">
              <label
                htmlFor="file"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg 
    cursor-pointer hover:bg-purple-600 active:bg-purple-700 transition"
              >
                Choose File
              </label>

              <span id="fileName" className="text-gray-600">
                No file selected
              </span>

              <input
                id="file"
                name="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setFormData({ ...formData, projectImage: e.target.files[0] });
                  handleShowName(e);
                }}
              />

            </div>
          </div>
          <button type="submit" className='bg-blue-700 w-full cursor-pointer  p-2 rounded-md hover:bg-blue-800 active:bg-blue-900 text-white text-xl font-semibold'>Edit</button>
        </form>
      </div>
      <ToastContainer />

    </>
  )
}

export default EditProject
