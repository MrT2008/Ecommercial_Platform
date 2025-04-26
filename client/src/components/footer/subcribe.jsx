import React from "react";
import Logo from '../shares/logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Subscribe = () => {
    return (
        <div className='w-full md:w-1/4 lg:w-1/5 flex flex-col items-start text-white px-4 mb-6 md:mb-0 md:px-2'>
            <a href='/' className='mb-2 md:mb-4'>
                <Logo changeColor='white' changeID='mall' size='text-lg md:text-xl' />
            </a>
            <a
                href='/'
                className='text-white text-base md:text-lg font-bold mb-1 md:mb-2'
            >
                Subscribe
            </a>
            <p className='text-white text-xs md:text-sm mb-3 md:mb-4'>
                Get 10% off your first order
            </p>
            <form action='' className='flex relative w-full'>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your email'
                    className='bg-transparent border-white border-2 outline-0 text-white pr-10 pl-2 py-2 rounded-xl w-full placeholder-white placeholder-opacity-70'
                />
                <button
                    type='submit'
                    className="text-blue-950 absolute right-0 rounded-xl hover:opacity-80 transition-opacity"
                    aria-label="Subscribe"
                >
                    <FontAwesomeIcon 
                        icon={faPaperPlane} 
                        className='text-white px-3 md:px-4 py-2 md:py-3' 
                    />
                </button>
            </form>
        </div>
    )
}

export default Subscribe;