import React from 'react';
import SignupForm  from './signupForm';
import Template from './template';

const SignupContainer = () => {
  return (
    <div className="flex items-center h-screen mt-10">
        <Template />
        <SignupForm/>
    </div>
  );    
}

export default SignupContainer;