import React from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import '../style/start.css'
import logo from '../style/images/WFL.jpg'

const Start = () => {

    return (
        <>
            <div className="start-page-container">
                <div className="start-logo-container">
                    <img className="start-logo" src={logo} />
                </div>
                <div className="forms-container">
                    <LoginForm />
                    <SignUpForm />
                </div>
            </div>
        </>
    );
}

export default Start