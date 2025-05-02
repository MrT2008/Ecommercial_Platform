import React from 'react'

const QuickLink = () => {
  return (
    <div className='w-full md:w-1/4 lg:w-1/5 flex flex-col items-start text-white px-4 mb-6 md:mb-0 md:px-2'>
        <h2 className='text-lg md:text-xl font-bold mb-3 md:mb-4'>
            Quick Links
        </h2>
        <a href='/link/privacy-policy' className='text-sm md:text-base mb-2 hover:underline '>
            Privacy Policy
        </a>
        <a href='/link/term-of-use' className='text-sm md:text-base mb-2 hover:underline'>
            Term of Use
        </a>
        <a href='/link/faq' className='text-sm md:text-base mb-2 hover:underline'>
            FAQ
        </a>
    </div>
  )
}

export default QuickLink