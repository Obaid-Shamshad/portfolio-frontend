import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { sendMessage } from '../../api/contactAPI';
import { ToastContainer, toast } from 'react-toastify';


function Contact({ profile }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const url = profile[0]?.cvURL;
    const downloadUrl = url?.replace('/upload/', '/upload/fl_attachment/');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendMessage(formData);
            if (response.status === 200) {
                toast.success('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error('Failed to send message. Please try again later.');
            }
        } catch (error) {
            toast.error('Failed to send message. Please try again later.');
        }
    };

    return (
        <>
            <div className='min-h-screen xl:min-h-auto xl:py-12 bg-gray-700' id="contact">
                <div className='w-full h-52 flex justify-center items-center'>
                    <h1 className='text-3xl font-bold text-gray-200 text-shadow-lg text-shadow-black border-b-2 border-fuchsia-700 py-8 w-3/4 text-center'>Contact <span className='text-fuchsia-500'>me</span></h1>
                </div>
                <div className='flex gap-8 flex-col md:flex-row justify-center items-center  md:px-12 lg:px-24 p-2'>
                    <div className='w-full  md:border-r-2 order-2 md:order-1 border-fuchsia-800 p-2'>
                        <h2 className='text-2xl font-bold text-fuchsia-500 mb-4'>Get in Touch</h2>
                        <p className='text-gray-300 mb-4'>Feel free to reach out to me for any inquiries, collaborations, or just to say hello! I'm always open to connecting with new people and discussing exciting opportunities.</p>
                        <p className='text-gray-300 mb-4'>You can contact me via email at <a href='https://mail.google.com/mail/?view=cm&to=obaidshamshad5656@gmail.com' target='_blank' rel='noopener noreferrer' className='text-fuchsia-500 hover:text-fuchsia-400'>obaidshamshad5656@gmail.com</a></p>
                        <p className='text-gray-300 mb-4'><span className='text-fuchsia-500'>Phone:</span> +1 (234) 567-890</p>
                        <a href={downloadUrl} download className='flex items-center w-fit p-2 bg-fuchsia-700 text-white font-semibold mt-6 rounded-sm cursor-pointer hover:bg-fuchsia-800 md:transition-all md:duration-150 active:bg-purple-900'>Download CV <FiDownload className='text-xl text-fuchsia-300' /></a>


                    </div>
                    <div className='w-full flex order-1 justify-center p-2'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-white p-4 mb-2  shadow-[0_0_10px_fuchsia] rounded-md mt-4 w-96'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="name" className='font-medium'>Name</label>
                                <input type="text" id="name" name="name" placeholder='Enter your name' className='border border-gray-400 p-1 px-2 rounded-md outline-none focus:border-fuchsia-600 focus:shadow-[0_0_5px_fuchsia]' value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='font-medium'>Email</label>
                                <input type="email" id="email" name="email" placeholder='Enter your email' className='border border-gray-400 p-1 px-2 rounded-md outline-none  focus:border-fuchsia-600 focus:shadow-[0_0_5px_fuchsia]' value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="message" className='font-medium'>Message</label>
                                <textarea id="message" name="message" placeholder='Enter your message' className='border border-gray-400 p-1 px-2 rounded-md outline-none focus:border-fuchsia-600 focus:shadow-[0_0_5px_fuchsia] h-28' value={formData.message} onChange={handleChange} required></textarea>
                            </div>
                            <button type="submit" className='bg-fuchsia-700 cursor-pointer font-medium text-xl text-white py-2 px-4 rounded-md hover:bg-fuchsia-800  active:bg-fuchsia-900'>Send Message</button>

                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Contact
