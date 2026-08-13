import React, { useEffect, useState } from 'react'
import { getSkills } from '../../api/skillApi';
import CircularProgress from '../../components/CircularProgress';

function WebSkill() {
    const [skills, setSkills] = useState([]);
    const [skillType, setSkillType] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await getSkills();
                setSkills(response.data.skills);
                const types = [...new Set(response.data?.skills?.map(skill => skill.category))];
                setSkillType(types);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        fetchSkills();
    }, []);

    return (
        <>
            {skillType.length > 0 && (
                <div className="min-h-screen 2xl:min-h-auto 2xl:py-12 flex flex-col bg-gray-700" id="skills">
                    <div className='h-60 w-full flex justify-center items-center'>
                        <h1 className='text-3xl font-bold text-white text-shadow-lg text-shadow-black border-b-2 border-gray-500 w-3/4 text-center py-8'><span className='text-red-500'>My</span> Skills</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 p-4  md:px-12 lg:px-24 text-white'>
                        {skillType?.map((type, index) => (
                            <div key={index} className='flex w-full max-w-98 flex-col gap-4 shadow-[0_0_5px_white] hover:scale-[1.03] hover:shadow-[0_0_20px_gray] p-2 rounded-md items-center transition-all duration-500'>
                                <h1 className='text-xl font-bold border-b-2 border-gray-500 w-full text-center p-2'>{type}</h1>
                                <div className='flex w-full flex-col gap-2 '>
                                    {skills.filter(skill => skill.category === type).map((skill, idx) => (
                                        <div key={idx} className='flex items-center justify-between gap-2  transition-all duration-300 hover:shadow-[0_0_10px_gray] p-2 sm:px-8'>
                                            <h2 className='text-lg font-semibold'>{skill.name}</h2>
                                            <CircularProgress percentage={skill.level} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>)}
        </>
    )
}

export default WebSkill
