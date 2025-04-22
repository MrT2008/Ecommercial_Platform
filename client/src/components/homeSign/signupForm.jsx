import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin} from '@react-oauth/google';
import {useAuth } from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Button from '../shares/Button';
import React from 'react'

const SignUpForm = () => {

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const { signUp, login, loginWithGoogle, session, error } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if (!userEmail || !password || !fullName) {
            setErrorMessage('Please enter all fields.');
            return;
        }
        
        if (!agree) {
            setErrorMessage('Please agree to the Terms and Conditions.');
            return;
        }
    
        try {
            await signUp(userEmail, password, fullName);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const success = await login(userEmail, password);
            
            if (!success) {
                setErrorMessage('Success Register but Login failed. Please try again.');
            } else {
                setErrorMessage('');
                navigate('/');
            }
        } catch (error) {
            if (error.response?.status === 409) {
                setErrorMessage('Email already registered. Please use a different email.');
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        }
    }

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    } 
    , [session, navigate]);

    
    
  return (
    <div className="flex flex-col justify-center w-full md:w-3/4 lg:w-1/2 mx-auto px-4 py-8">
      <div className="flex justify-center pb-6 md:pb-10">
        <h2 className='font-bold text-3xl md:text-4xl text-center'>Create an Account</h2>
      </div>
      
      <form className='flex flex-col justify-center items-start w-full mx-auto'
        onSubmit={handleSignUp}
      >
        <label className="w-full text-sm md:text-base mb-1">Enter your details below</label>
        
        <input 
          type="text" 
          placeholder="Full Name" 
          className='mt-2 mb-4 p-2 border-b-2 w-full outline-0 focus:border-blue-500 transition-colors'
          name='fname'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input 
          type="email"
          placeholder='Email'
          className='mt-2 mb-4 p-2 border-b-2 w-full outline-0 focus:border-blue-500 transition-colors'
          name='email'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <div className="w-full relative">
            <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                className='mt-2 mb-4 p-2 border-b-2 w-full outline-0 focus:border-blue-500 transition-colors'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-gray-500" />
            </div>
        </div>

        <div className="w-full flex items-center pt-2 pb-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id='agree' 
              name='agree'
              className="h-4 w-4"
              checked={agree}
              onChange={(e) =>{
                setAgree(e.target.checked)
                if (error) setErrorMessage('')
              }}
            />
            
            <label className='pl-2 text-sm md:text-base' htmlFor='remember'>
              I agree to the
              <a href="#" className='text-blue-500 underline pl-1 hover:text-blue-700'>
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>

        {errorMessage && <p className="text-red-500 w-full">{errorMessage}</p>}
        <div
         className='flex flex-col justify-center items-center w-full py-2'
        >
            <Button type='submit' text='Sign Up' id='signup' otherClassName='button text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2' />
            <div className="relative flex items-center justify-center w-full my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="w-full flex justify-center">
                <GoogleLogin
                    type='icon'
                    logo='Google'
                    theme='filled_blue'
                    logo_alignment='center'
                    shape='pill'
                    onSuccess={(response) => {
                        const credential = response.credential;
                        loginWithGoogle(credential);
                    }}
                    />
            </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm;