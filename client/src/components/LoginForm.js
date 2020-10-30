import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth'
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';



function UserForm(props) {
    const [username, setUsername] = useState("Ian");
    const [password, setPassword] = useState("password");
    let history = useHistory();

    const [errors, setErrors] = useState([]);
    const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
    const submitForm = (e) => {
        e.preventDefault();

        async function loginUser() {
            const response = await fetchWithCSRF(`/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {
                setCurrentUserId(responseData.current_user_id)
                history.push('/feed')
            }
        }
        loginUser();
    }
    return (
        <div className="login-form-container">
            <h1 className="login-form-title">Login</h1>
            <form className="login-form">
                {errors.length ? errors.map((err) => <li key={err} >{err}</li>) : ''}
                <div className="field">
                    <FormLabel>Username: </FormLabel>
                    <div className="control">
                        <input className="form-input input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
                    </div>
                    <FormLabel>Password: </FormLabel>
                    <div className="control">
                        <input className="form-input input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                    </div>
                </div>
                <div className="login-username-submit-container">
                    <Button onClick={submitForm} className="forms-button" variant="contained" color="primary">Login</Button>
                </div>
            </form>
        </div>
    );
}
export default UserForm;
