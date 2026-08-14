import React, { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '../../api/profileAPI';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';


function Updateprofile() {
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    about: '',
    profilePicture: null
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setsubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProfileData = async () => {
      try {
        const response = await getProfile();
        setLoading(false);
        if (response.data.success) {
          setProfileData({
            name: response.data.profile[0].name || '',
            bio: response.data.profile[0].bio || '',
            about: response.data.profile[0].about || '',
            profilePicture: null
          });
          document.getElementById('fileName').innerText = response.data.profile[0].profilePicture ? response.data.profile[0].profilePicture.split('/').pop() : 'No file selected';
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      };
    }
    fetchProfileData();
  }, []);

  const handleupload = (e) => {
    let fileName = document.getElementById('fileName');
    if (fileName) {
      const file = e.target.files[0];
      fileName.innerText = `${file.name.slice(0, 20)}...` || 'No file selected'; // Display the truncated file name
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', profileData.name);
    formDataToSend.append('bio', profileData.bio);
    formDataToSend.append('about', profileData.about);
    if (profileData.profilePicture) {
      formDataToSend.append('profilePicture', profileData.profilePicture);
    }

    try {
      setsubmitting(true);
      const response = await updateProfile(formDataToSend);
      setsubmitting(false);
      if (response.data.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile.');
      setsubmitting(false);
    }
  };

  return (
    <>
      <div className="lg:ml-64 mt-20 flex 2xl:mt-0 2xl:items-center 2xl:min-h-screen justify-center relative">
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-100 p-2  shadow-[0_0_5px_gray] rounded-lg'>
          <h1 className="text-xl font-bold text-center m-4">Update Profile</h1>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} required className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' autoComplete='off' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" id="bio" rows="3" value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none'></textarea>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="about">About</label>
            <textarea name="about" id="about" rows="3" value={profileData.about} onChange={(e) => setProfileData({ ...profileData, about: e.target.value })} className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none'></textarea>
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
                className="hidden"
                onChange={(e) => {
                  setProfileData({ ...profileData, profilePicture: e.target.files[0] });
                  handleupload(e);
                }}
              />

            </div>
          </div>
          {submitting ? <div className='mt-6 w-full border border-gray-300 cursor-not-allowed p-2 rounded-md font-semibold'>
            <Spinner />
          </div> : <button type='submit' className='mt-6 bg-blue-700 w-full cursor-pointer p-2 rounded-md hover:bg-blue-800 active:bg-blue-900 text-white text-xl font-semibold'>Change Password</button>}
        </form>
        {loading && <div className='h-screen fixed lg:ml-64 lg:mr-64 w-full top-0 flex justify-center bg-black/50 items-center'>
          <Spinner />
        </div>}
      </div>
      <ToastContainer />
    </>
  )
}

export default Updateprofile
