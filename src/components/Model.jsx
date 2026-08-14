import React from 'react'

function Model({ setIsOpenModel, deleteData }) {
  return (
   <>
    <div className='h-screen fixed lg:left-64 right-0 top-0 flex justify-center bg-black/50 items-center'>
      <div className='w-full flex flex-col gap-20 bg-gray-200 opacity-100 max-w-78 p-2 relative rounded-lg shadow-[0_0_20px_white]'>
        <h1>Are you sure you want to delete it, it will be deleted permenantly</h1>
       <div className="relative">
         <div className='flex  right-2 bottom-2 absolute justify-center items-center gap-2'>
            <button onClick={() => setIsOpenModel(false)} className='bg-gray-300 cursor-pointer hover:bg-gray-400 active:bg-gray-500 rounded-lg p-2'>Cancel</button>
            <button onClick={() => {
              deleteData();
              setIsOpenModel(false)
            }} className='bg-red-600 text-white cursor-pointer hover:bg-red-500 active:bg-red-700  rounded-lg p-2'>Delete</button>
        </div>
       </div>
      </div>
    </div>
    </>
  )
}

export default Model
