import React from "react";
import Logo from '../logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'

const Subscribe = () => {
    return (
        <div className='w-1/4 flex flex-col items-start'>
            <a
                href='/'
            >
                <Logo changeColor='white' changeID='mall' size='text-xl' />
            </a>
            <a
                href='/'
                className='text-white text-lg font-bold'
            >
                Subscribe
            </a>
            <p
                className='text-white text-sm'
            >
                Get 10% off your first order
            </p>
            <form
                action=''
                className='flex relative'
            >
                <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                className=' border-white border-2 outline-0 text-white pr-10 pl-2 py-2 rounded-xl'
                />
                <button
                type='submit'
                className=" text-blue-950 absolute right-0 rounded-xl"
                >
                <FontAwesomeIcon icon={faPaperPlane} className='text-white px-5 py-3.5' />
                </button>
            </form>

        </div>
    )
}

export default Subscribe;