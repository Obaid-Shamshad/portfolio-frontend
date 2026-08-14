import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';


function Login({ setIsLoggedIn }) {
  const [cradentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await login(cradentials);
      setLoading(false)
      if (response.data.success === true) {
        console.log("Login successful:", response.data);
        window.localStorage.setItem("userId", response.data.userId);
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
      if (response.data.success === false) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
          setLoading(false)
    }
  }

  return (
    <>
      <div className='flex justify-center bg-gray-900/50 z-50 text-gray-200 items-center h-screen fixed top-0 left-0 w-full '>
        <form onSubmit={handleSubmit} className='p-6 bg-gray-800/40 shadow-[0_0_10px_white] rounded-md '>
          <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="username" className='font-medium'>Username</label>
            <input type="text" id="username" name="username" value={cradentials.username} onChange={(e) => setCredentials({ ...cradentials, username: e.target.value })} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-300' autoComplete='username' required />
          </div>
          <div className='mb-4 flex flex-col gap-1'>
            <label htmlFor="password" className='font-medium'>Password</label>
            <input type="password" id="passw          ord" name="password" value={cradentials.password} onChange={(e) => setCredentials({ ...cradentials, password: e.target.value })} className='p-1 px-2 outline-none border rounded-md focus:shadow focus:border-blue-400 focus:shadow-blue-500 ' autoComplete='current-password' required />
          </div>
          <div className="flex gap-3">
            <div className='flex items-center mb-4 gap-1'>
              <input type="checkbox" name="remember me" id="remember me" />
              <label htmlFor="remember me">Remember me</label>
            </div>
            <Link to="/forgot-password" className='text-red-400 hover:underline'>Forgot-password</Link>
          </div>
    {submitting ? <div className='mt-6 w-full border border-gray-300 cursor-not-allowed p-2 rounded-md font-semibold'>
              <Spinner />
            </div> : <button type='submit' className='mt-6 bg-blue-700 w-full cursor-pointer p-2 rounded-md hover:bg-blue-800 active:bg-blue-900 text-white text-xl font-semibold'>Login</button>}
        </form>
      </div>
      <ToastContainer />

    </>
  )
}

export default Login
