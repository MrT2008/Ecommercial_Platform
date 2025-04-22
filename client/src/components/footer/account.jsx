import React from 'react'

const Account = () => {
  return (
    <div className='w-full md:w-1/4 lg:w-1/5 flex flex-col items-start text-white px-4 mb-6 md:mb-0 md:px-2'>
        <h2 className='text-lg md:text-xl font-bold mb-3 md:mb-4'>
            Account
        </h2>
        <a href='' className='text-sm md:text-base mb-2 hover:underline'>
            My Account
        </a>
        <a href='' className='text-sm md:text-base mb-2 hover:underline'>
            Log in/ Register
        </a>
        <a href="" className='text-sm md:text-base mb-2 hover:underline'>
            Cart
        </a>
        <a href="" className='text-sm md:text-base hover:underline'>
            Shop
        </a>
    </div>
  )
}

export default Account