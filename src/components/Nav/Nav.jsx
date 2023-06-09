import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';

import { Typography } from '@mui/material';

function Nav() {

	const dispatch = useDispatch();

	// ------- Storing user information -------
	const user = useSelector((store) => store.user);

	// ------- Logs out user -------
	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	}

	return (
		<div>
			<Typography className="nav">
				{/* ------- Title header ------- */}
				<Link to="/home">
					<Typography className="nav-title" variant="h4">
						Pix
					</Typography >
				</Link>
				<div>
					{/* ------- If no user is logged in, show these ------- */}
					{!user.id && (
						<>
							{/* ------- Login link ------- */}
							<Link className="navLink" to="/login">
								Login
							</Link>

							{/* ------- Register link ------- */}
							<Link className="navLink" to="/registration">
								Register
							</Link>
						</>
					)}

					{/* ------- If a user is logged in, show these ------- */}
					{user.id && (
						<>
							{/* ------- Champions link ------- */}
							<Link className="navLink" to="/champions">
								Champions
							</Link>

							{/* ------- Favorites link ------- */}
							<Link className="navLink" to="/favorites">
								Favorites
							</Link>
						</>
					)}

					{/* ------- About link ------- */}
					<Link className="navLink" to="/about">
						About
					</Link>
				</div>
			</Typography>

			{/* ------- If a user is logged in, show these ------- */}
			{user.id && (
				<div className="signed-in-section">

					{/* ------- Logged in as ------- */}
					<span className="signed-in-text">
						Logged in as {user.username}
					</span>
					|

					{/* ------- Logout ------- */}
					<span className="logout-text" onClick={handleLogout}>
						Logout
					</span>
				</div>
			)}
		</div>
	);
}

export default Nav;
