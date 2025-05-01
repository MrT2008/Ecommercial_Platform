import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {useAuth } from '../../hooks/useAuth';

import Logo from '../shares/logo';
import Button from '../shares/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const loginForm = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, loginWithGoogle, session, error, user } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!userEmail || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }
            await login(userEmail, password);
    }
    useEffect(() => {
        if (session) {
            if (user?.roles?.includes('manager')) {
                navigate('/admin/admin-dashboard'); // just an example, we don't have the admin page yet
            } else if (user?.roles?.includes('buyer')) {
                navigate('/');
            } else if (user?.roles?.length === undefined) { //handle case when user has no role
                setErrorMessage('');
            } 
            else {
                setErrorMessage('Invalid role. Please contact support.');
            }
        } else if (error) {
            setErrorMessage(error);
        }
    }, [session, user, error, navigate]);
  return (
    <div className="flex flex-col justify-center w-full md:w-3/4 lg:w-1/2 mx-auto px-4">
        <div className="flex justify-center pb-6 md:pb-10 flex-wrap">
            <h2 className='font-bold text-3xl md:text-4xl pr-1 text-center'>Log in to </h2>
            <Logo size='text-3xl md:text-4xl' />
        </div>
        <form className='flex flex-col justify-center items-start w-full mx-auto'
        onSubmit={handleLogin}
        >
            <label className="w-full">Enter your details below</label>
            {(errorMessage || error ) && <p className="text-red-500 w-full">{error}</p>}
            <input 
            type="text"
            placeholder='Email' 
            className='mt-2 mb-2 py-2 border-b-2 w-full outline-0'
            name='email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            />

            <div className="relative w-full">
            <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            className='relative mt-2 mb-2 py-2 border-b-2 w-full outline-0'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Toggle password visibility"
            >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            </div>
            

            <div className="w-full flex justify-between items-center py-3 flex-wrap">
                <div className="rememberMe">
                    <input
                    type="checkbox" 
                    id='remember'
                    name='remember'
                    />
                    <label className='pl-2' htmlFor='remember'>Remember me</label>
                </div>

                <a href="#" className='text-blue-500 whitespace-nowrap'>Forgot Password?</a>
            </div>

            <div className="flex flex-col justify-center items-center w-full py-2">
                <Button type='submit' text='Log in' otherClassName='yellow text-sm w-full rounded-lg py-4'/>
                <div className="flex items-center justify-center w-full h-10 my-2">
                    Or sign in with
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
                        {/* can sua backend moi connect duoc */}
                </div>
            </div>
        </form>
        <div className="w-full flex justify-center items-center py-2">
            <p className='text-md'>Don't have an account? </p>
            <a href="/signup" className='text-blue-900 pl-1 underline text-md'>Create an account</a>
        </div>
    </div>
  )
}

export default loginForm