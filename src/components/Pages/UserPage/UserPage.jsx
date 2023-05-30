import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import Typography from '@mui/material/Typography';

import './UserPage.css'

function UserPage() {

	const history = useHistory();
	const dispatch = useDispatch();

	// ------- Fetching champion info from DB -------
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPION_INFO' });
	}, []);

	// --------- Storing user data ---------
	const user = useSelector(store => store.user);

	// ------- Brings user to champions page -------
	const toChampionsPage = () => {
		history.push('/champions')
	}

	return (
		<div className="welcome-container">

			{/* ------- Welcome, user information ------- */}
			<center>
				<Typography variant="h4">
					Welcome, {user.username}!
				</Typography>	
				<br />	
				<img 
					src="images/pix-small.png" 
					style={{ width: '500px', cursor: 'pointer' }}
					onClick={toChampionsPage}
				/>
				<br /><br />
				<Typography>
					Pix has arrived, and is here to assist you with champion select.
					<br /><br />
					Click on Pix to begin!
				</Typography>
			</center>			
		</div>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
