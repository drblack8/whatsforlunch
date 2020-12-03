import React, { useState, useContext } from 'react';
import AuthContext from '../auth';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';





const SignUpForm = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
    const [errors, setErrors] = useState([])

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setErrors([...errors, 'Passwords must match'])
            return
        }
        const data = await fetchWithCSRF('/api/users/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, confirm: confirmPassword, username: userName, email: email }),
        })
        if (data.ok) {
            const response = await data.json();
            return <Redirect to={`/login`} />
        }
        else {
            const response = await data.json();
            const { errors } = response
            setErrors(errors)
        }
    }

    return (
        <div className="signup-form-container">
            <h1 className="signup-title">Signup</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-username-username-container">
                    <div>
                        <FormLabel>Username:</FormLabel>
                    </div>
                    <div>
                        <input className="form-input" onChange={handleUserName} value={userName} type="text" />
                    </div>
                    <div className="errors-div">
                        {errors && errors.username && errors.username.map(error =>
                            <p>{error}</p>
                        )}
                    </div>
                </div>
                <div className="signup-username-email-container">
                    <div>
                        <FormLabel>Email:</FormLabel>
                    </div>
                    <div>
                        <input className="form-input" onChange={handleEmail} value={email} type="text" />
                    </div>
                    <div className="errors-div">
                        {errors && errors.email && errors.email.map(error =>
                            <p>{error}</p>
                        )}
                    </div>
                </div>
                <div className="signup-username-password-container">
                    <div>
                        <FormLabel>Password:</FormLabel>
                    </div>
                    <div>
                        <input className="form-input" onChange={handlePassword} value={password} type="password" />
                    </div>
                    <div className="errors-div">
                        {errors && errors.password && errors.password.map(error =>
                            <p>{error}</p>
                        )}
                    </div>
                </div>
                <div className="signup-username-confirm-container">
                    <div>
                        <FormLabel>Confirm:</FormLabel>
                    </div>
                    <div>
                        <input className="form-input" onChange={handleConfirmPassword} value={confirmPassword} type="password" />
                    </div>
                    <div className="errors-div">
                        {errors && errors.confirm && errors.confirm.map(error =>
                            <p>{error}</p>
                        )}
                    </div>
                </div>
                <div className="signup-username-submit-container">
                    <Button className="forms-button" variant="contained" color="primary" type="submit" >Signup</Button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm
