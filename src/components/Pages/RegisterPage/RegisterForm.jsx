import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {

    const dispatch = useDispatch();

    // ------- Storing username and password -------
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ------- Storing errors -------
    const errors = useSelector((store) => store.errors);

    // ------- Register user -------
    const registerUser = (event) => {
        event.preventDefault();

        dispatch({
            type: 'REGISTER',
            payload: {
                username: username,
                password: password,
            },
        });
    };

    return (
        // ------- Register user form -------
        <form className="formPanel" onSubmit={registerUser}>
            <h2>New User Registration</h2>
            <hr /><br />
            {errors.registrationMessage && (
                <h3 className="alert" role="alert">
                    {errors.registrationMessage}
                </h3>
            )}
            <div>
                <label htmlFor="username">
                    Username:
                    <br />
                    <input
                        type="text"
                        name="username"
                        value={username}
                        required
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="password">
                    Password:
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        required
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
            </div>
            <br />
            <div>
                <input className="btn" type="submit" name="submit" value="Register" />
            </div>
            <br />
        </form>
    );
}

export default RegisterForm;
