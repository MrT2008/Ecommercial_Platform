
import Logo from '../shares/logo';
import Button from '../shares/Button';
import React from 'react'

const loginForm = () => {
  return (
    <div className="flex flex-col justify-center w-1/2 mr-auto ml-auto">
        <div className="flex justify-center pb-10">
            <h2 className=' font-bold text-4xl pr-1'>Log in to </h2>
            <Logo size='text-4xl' />
        </div>
        <form className='flex flex-col justify-center items-start mr-auto ml-auto'>
            <label>Enter your details below</label>
            <input 
            type="text" 
            placeholder="Username" 
            className=' mt-1.5 mb-1.5 pt-1.5 pb-1.5 border-b-2 w-70 outline-0'
            name='username'
            />


            <input 
            type="password" 
            placeholder="Password" 
            className=' mt-1.5 mb-1.5 pt-1.5 pb-1.5 border-b-2 w-70 outline-0'
            name='password'
            />

            <div className="w-70 flex justify-between items-center pt-2 pb-2">
                <div className="rememberMe">
                    <input type="checkbox" id='remember' />
                    <label className='pl-2' htmlFor='remember'>Remember me</label>
                </div>

                <a href="#" 
                className='text-blue-500'
                >Forgot Password?</a>
            </div>

            <Button text='Log in' otherClassName='login mt-5 w-70' type='submit' href='./login'/>
            <Button text='Log in with Google' otherClassName='google mt-5 w-70 border' type='' href='./logingg'/>
        </form>
    </div>
  )
}

export default loginForm