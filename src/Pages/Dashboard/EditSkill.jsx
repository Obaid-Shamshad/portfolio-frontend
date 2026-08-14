import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { getSkill, editSkill } from '../../api/skillApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';


function EditSkill() {
    const { skillId } = useParams();
    const [skillData, setSkillData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setsubmitting] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchSkill = async () => {
            try {
                setLoading(true);
                const response = await getSkill(skillId);
                setLoading(false);
                setSkillData(response.data.skill);
                console.error('Error fetching skill:', error);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchSkill();
    }, []);

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
            const response = await editSkill(skillId, skillData);
            setsubmitting(false);
            if (response.data.success) {
                setSkillData(null);
                navigate('/dashboard/skills');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to update skill');
            setsubmitting(false);
        }
    };

    return (
        <>
            <div className="lg:ml-64 flex justify-center items-center min-h-screen">
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-100 p-4  shadow-[0_0_5px_gray] rounded-lg'>
                    <h1 className="text-xl font-bold text-center m-4">Edit Skill</h1>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="skill-name">Name</label>
                        <input type="text" name="skill-name" id="skill-name" value={skillData?.name || ''} onChange={(e) => setSkillData({ ...skillData, name: e.target.value })} required className='border border-gray-400  p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' autoComplete='off' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="category">Category</label>
                        <Select options={options} menuPlacement="auto" maxMenuHeight={115} placeholder="Select category..." value={skillData?.category ? options.find(opt => opt.value === skillData.category) : null} onChange={(selectedOption) => setSkillData({ ...skillData, category: selectedOption.value })} required />

                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="level">Level</label>
                        <input type="number" name="level" id="level" min="0" max="100" value={skillData?.level || ''} onChange={(e) => setSkillData({ ...skillData, level: e.target.value })} required className='border border-gray-400 p-1 px-2 rounded-md focus:shadow-[0_0_3px_blue] outline-none' />
                    </div>
                    {submitting ? <div className='mt-6 w-full border border-gray-300 cursor-not-allowed p-2 rounded-md font-semibold'>
                        <Spinner />
                    </div> : <button type='submit' className='mt-6 bg-blue-700 w-full cursor-pointer p-2 rounded-md hover:bg-blue-800 active:bg-blue-900 text-white text-xl font-semibold'>Edit</button>}
                </form>
                {loading && <div className='h-screen fixed lg:ml-64 lg:mr-64 w-full top-0 flex justify-center bg-black/50 items-center'>
                    <Spinner />
                </div>}
            </div>
            <ToastContainer />

        </>
    )
}

export default EditSkill
