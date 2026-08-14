import React, { useState } from 'react'
import Select from 'react-select'
import { addSkill } from '../../api/skillApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';


function NewSkill() {
    const [skillData, setSkillData] = useState({
        name: '',
        category: '',
        level: 0,
    });
    const [submitting, setsubmitting] = useState(false);

    const navigate = useNavigate();

    const options = [
        { value: 'Languages', label: 'Languages' },
        { value: 'Frontend', label: 'Frontend' },
        { value: 'Backend', label: 'Backend' },
        { value: 'Tools', label: 'Tools' },
        { value: 'Database', label: 'Database' },
        { value: 'Version Control', label: 'Version Control' },
    ];

    const handleSubmit = async (e) => {
         e.preventDefault();
        try {
            setsubmitting(true);
            const response = await addSkill(skillData);
            setsubmitting(false);
            if (response.data.success) {
                toast.success(response.data.message);
                setSkillData({ name: '', category: '', level: 0 });
            }
        } catch (error) {
            toast.error("Failed to add skill");
            setsubmitting(false);
        }
    };

    return (
        <>
            <div className="lg:ml-64 flex justify-center items-center min-h-screen">
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-100 p-4  shadow-[0_0_5px_gray] rounded-lg'>
                    <h1 className="text-xl font-bold text-center m-4">Add New Skill</h1>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="skill-name">Name</label>
                        <input type="text" name="skill-name" id="skill-name" value={skillData.name} onChange={(e) => setSkillData({ ...skillData, name: e.target.value })} required className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' autoComplete='off' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="category">Category</label>
                        <Select options={options} menuPlacement="auto" maxMenuHeight={115} placeholder="Select category..." value={options.find(option => option.value === skillData.category)} onChange={(selectedOption) => setSkillData({ ...skillData, category: selectedOption.value })} required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="level">Level</label>
                        <input type="number" name="level" id="level" min="0" max="100" value={skillData.level} onChange={(e) => setSkillData({ ...skillData, level: parseInt(e.target.value) })} required className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' />
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

export default NewSkill
