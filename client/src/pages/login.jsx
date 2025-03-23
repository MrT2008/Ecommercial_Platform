import {useState} from 'react';
import LoginContainer from '../components/homeSign/loginContainer';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        e.preventDefault();
        console.log('Logging in with: ', {username, password});
    }; 
    return ( 
        <div className="login-page">
            <LoginContainer />
        </div>
    );
};

export default Login;