import React, { useState } from 'react';
import { addProject } from '../../api/projectApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

function NewProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    liveLink: '',
    githubLink: '',
    projectImage: null
  });
  const [submitting, setsubmitting] = useState(false);

  const navigate = useNavigate();


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
    formDataToSend.append('projectImage', formData.projectImage);
    setsubmitting(true);
    const response = await addProject(formDataToSend);
    setsubmitting(false);
    if (response.data.success) {
      toast.success(response.data.message);
      setFormData({
        title: '',
        description: '',
        liveLink: '',
        githubLink: '',
        projectImage: null
      })
      let fileName = document.getElementById('fileName');
      if (fileName) {
        fileName.innerText = 'No file selected';
      }
    } else {
      toast.error(response.data.message);
    }
   } catch (error) {
     toast.error("failed to add project");
     setsubmitting(false);
   }
  }


  return (
    <>
      <div className="lg:ml-64 flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className='mt-20 p-4 shadow-[0_0_5px_gray] flex flex-col gap-3 w-100 rounded-lg'>
          <h1 className='text-xl font-semibold text-center py-2'>Add New Project</h1>
          <div className='flex flex-col gap-1'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className='border border-gray-400 h-20 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required></textarea>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="liveLink">Live Link</label>
            <input type="url" name="liveLink" id="liveLink" value={formData.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="githubLink">GitHub Link</label>
            <input type="url" name="githubLink" id="githubLink" value={formData.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' required />
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
                type="file"
                name="file"
                className="hidden"
                onChange={(e) => {
                  handleShowName(e);
                  setFormData({ ...formData, projectImage: e.target.files[0] });
                }}
                required
              />

            </div>
          </div>
          {submitting ? <div className='mt-6 w-full border border-gray-300 cursor-not-allowed p-2 rounded-md font-semibold'>
            <Spinner />
          </div> : <button type='submit' className='mt-6 bg-blue-700 w-full cursor-pointer p-2 rounded-md hover:bg-blue-800 active:bg-blue-900 text-white text-xl font-semibold'>Add</button>}
        </form>
      </div>
      <ToastContainer />

    </>
  )
}

export default NewProject
