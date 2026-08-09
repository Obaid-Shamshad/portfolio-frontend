import React, { useState } from 'react'
import { FaHandHolding } from 'react-icons/fa';
import { changePassword } from '../../api/passwordAPI';
import { ToastContainer, toast } from 'react-toastify';


function ChangePass() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }
    try {
      const response = await changePassword(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to change password.');
    }
  }
  return (
    <>
      <div className="lg:ml-64 flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-100 p-4  shadow-[0_0_5px_gray] rounded-lg'>
          <h1 className="text-xl font-bold text-center m-4">Change Password</h1>
          <div className='flex flex-col gap-2'>
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" name="currentPassword" id="currentPassword" value={formData.currentPassword} onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} required className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' autoComplete='off' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" name="newPassword" id="newPassword" value={formData.newPassword} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} required className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' autoComplete='off' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' autoComplete='off' />
          </div>
          <button type='submit' className='mt-6 bg-blue-700 w-full cursor-pointer p-2 rounded-md hover:bg-blue-800 text-white text-xl font-semibold'>Change Password</button>
        </form>
      </div>
      <ToastContainer />

    </>
  )
}

export default ChangePass
