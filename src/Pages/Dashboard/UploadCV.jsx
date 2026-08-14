import React, { useState, useEffect } from 'react'
import { uploadCV, getProfile } from '../../api/profileAPI';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';


function UploadCV() {
  const [cv, setCV] = useState(null);
  const [showCV, setShowCV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setsubmitting] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile()
        setLoading(false);
        setCV(response.data.profile[0].cvURL || null)
        setShowCV(response.data.profile[0].cvURL || null)
        console.log("Profile data fetched..:", response.data.profile[0].cvURL)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setLoading(false);
      }
    }

    fetchProfile()
  }, [])

  const handleupload = (e) => {
    let fileName = document.getElementById('fileName');
    if (fileName) {
      const file = e.target.files[0];
      fileName.innerText = `${file.name.slice(0, 20)}...` || '';

    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("cv", cv);

    try {
      setsubmitting(true);
      const response = await uploadCV(formDataToSend);
      setsubmitting(false);
      if (response.data.success) {
        toast.success(response.data.message);
        setCV(null);
        document.getElementById('fileName').innerText = '';
      } else if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.error('Failed to upload CV.');
      }
    } catch (error) {
      toast.error("failed to upload CV..");
      setsubmitting(false);
    }
  };

  return (
    <>
      <div className='lg:ml-64 p-2 flex justify-center items-center min-h-screen'>
        <div className=' w-full h-auto mt-16 max-w-98 border border-gray-300 rounded-lg p-4 shadow-[0_0_5px_gray]'>
          <div className='w-full aspect-7.5/8 '><iframe src={showCV} className='h-full w-full object-cover' title='CV' /></div>
          <form onSubmit={handleSubmit} className='p-4 w-full rounded-lg mt-2 shadow-[0_0_5px_gray]'>
            <div className="flex justify-center items-center w-full ">
              <label
                htmlFor="file"
                className=' p-2 px-6 bg-gray-100 text-black text-2xl font-bolder shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all' >
                +
              </label>
              <span id="fileName" className="text-gray-600"></span>

              <input
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setCV(e.target.files[0]);
                  handleupload(e);
                }}
                required
              />

            </div>
            {submitting ? <div className='mt-6 w-full border border-gray-300 cursor-not-allowed p-2 rounded-md font-semibold'>
              <Spinner />
            </div> : <button type='submit' className='mt-6 bg-blue-700 w-full cursor-pointer p-2 rounded-md hover:bg-blue-800 active:bg-blue-900 text-white text-xl font-semibold'>Upload</button>}
          </form>
        </div>
        {loading && <div className='h-screen fixed lg:ml-64 lg:mr-64 w-full top-0 flex justify-center bg-black/50 items-center'>
          <Spinner />
        </div>}
      </div>
      <ToastContainer />
    </>
  )
}

export default UploadCV

