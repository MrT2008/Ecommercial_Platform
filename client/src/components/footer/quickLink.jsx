import React from 'react'

const QuickLink = () => {
  return (
    <div className='w-full md:w-1/4 lg:w-1/5 flex flex-col items-start text-white px-4 mb-6 md:mb-0 md:px-2'>
        <h2 className='text-lg md:text-xl font-bold mb-3 md:mb-4'>
            Quick Links
        </h2>
        <a href='' className='text-sm md:text-base mb-2 hover:underline'>
            Privacy Policy
        </a>
        <a href='' className='text-sm md:text-base mb-2 hover:underline'>
            Term of Use
        </a>
        <a href='' className='text-sm md:text-base mb-2 hover:underline'>
            FAQ
        </a>
        <a href='' className='text-sm md:text-base hover:underline'>
            Contact
        </a>
    </div>
  )
}

export default QuickLink