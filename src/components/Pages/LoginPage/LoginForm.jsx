import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {

	const history = useHistory();
	const dispatch = useDispatch();

	// ------- Storing username and password -------
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// ------- Storing errors -------
	const errors = useSelector(store => store.errors);

	// ------- Login -------
	const login = (event) => {
		event.preventDefault();

		if (username && password) {
			dispatch({
				type: 'LOGIN',
				payload: {
					username: username,
					password: password,
				},
			});
			history.push('/user')
		} else {
			dispatch({ type: 'LOGIN_INPUT_ERROR' });
		}
	};

	return (
		// ------- Login form -------
		<form className="formPanel" onSubmit={login}>
			<h2>Login</h2>
			<hr /><br />
			{errors.loginMessage && (
				<h3 className="alert" role="alert">
					{errors.loginMessage}
				</h3>
			)}
			<div>
				<label htmlFor="username">
					Username:
					<br />
					<input
						type="text"
						name="username"
						required
						value={username}
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
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</label>
			</div>
			<br />
			<div>
				<input className="btn" type="submit" name="submit" value="Log In" />
			</div>
			<br />
		</form>
	);
}

export default LoginForm;
