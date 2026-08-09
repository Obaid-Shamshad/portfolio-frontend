import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../api/passwordAPI'
import { ToastContainer, toast } from 'react-toastify';

function ForgetPass() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred while resetting the password.');
    }
  };

  return (
    <>
      <div className='flex justify-center bg-gray-900/50 z-50 text-gray-200 p-2 items-center h-screen fixed top-0 left-0 w-full'>
        <form className='p-6 bg-gray-800/40 shadow-[0_0_10px_white] rounded-md w-full max-w-80' onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold text-center mb-4'>Reset Password</h1>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="name" className='font-medium'>username</label>
            <input type="text" name="username" id="username" placeholder='Enter your name' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-500 ' />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="password" className='font-medium'>New Password</label>
            <input type="password" name="password" id="password" placeholder='Enter your new password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-500 ' />
          </div>
          <button type="submit" className="bg-blue-500 cursor-pointer text-white p-2 rounded-md w-full hover:bg-blue-600">Reset Password</button>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default ForgetPass
