import {useState, useEffect} from 'react';
import LoginContainer from '../components/homeSign/loginContainer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {

    const { session} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    }
    , [session, navigate]);

    return ( 
        <div className="login-page">
            <LoginContainer />
        </div>
    );
};

export default Login;