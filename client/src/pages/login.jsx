import {useState} from 'react';
import Heading from '../components/header/heading';
import HeadingBar from '../components/header/main';
import LoginContainer from '../components/homeSign/loginContainer';
import Footer from '../components/footer/main';

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
            <Footer />
        </div>
    );
};

export default Login;