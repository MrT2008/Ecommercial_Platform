import {useState} from 'react';
import Heading from '../components/header/heading';
import HeadingBar from '../components/header/main';
import LoginContainer from '../components/login/main';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        e.preventDefault();
        console.log('Logging in with: ', {username, password});
    }; 
    return ( 
        <div className="login-page">
            <Heading />
            <HeadingBar />
            <LoginContainer />
        </div>
    );
};

export default Login;