import React from 'react'

function Spinner() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='w-8 h-8 rounded-full border-2 border-gray-200 animate-spin border-t-transparent'></div>
      </div>
    </>
  )
}

export default Spinner
