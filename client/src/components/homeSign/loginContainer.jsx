// import React from 'react';
import LoginForm  from './loginForm';
import Template from './template';

const LoginContainer = () => {
  return (
    <div className="flex items-center h-screen mt-10">
        <Template />
        <LoginForm/>
    </div>
  );    
}

export default LoginContainer;