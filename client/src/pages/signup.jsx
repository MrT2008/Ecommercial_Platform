
import Heading from '../components/header/heading';
import HeadingBar from '../components/header/main';
import SignupContainer from '../components/homeSign/signupContainer';
import Footer from '../components/footer/main';

const Login = () => {
    return ( 
        <div className="login-page">
            <Heading />
            <HeadingBar />
            <SignupContainer />
            <Footer />
        </div>
    );
};

export default Login;