import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {

	const history = useHistory();

	// --------- Storing user data ---------
	const user = useSelector(store => store.user);

	// ------- Brings user to champions page -------
	const toChampionsPage = () => {
		history.push('/champions')
	}

	return (
		<div className="container">

			{/* ------- Welcome, user information ------- */}
			<center>
				<h2>Welcome, {user.username}!</h2>		
				<img 
					src="images/pix-small.png" 
					style={{ width: '500px', cursor: 'pointer' }}
					onClick={toChampionsPage}
				/>
				<br /><br />
				<span>Pix has arrived, and is here to assist you with champion select!</span>
				<br /><br />
				<span>Click on Pix to begin.</span>
			</center>			
		</div>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
