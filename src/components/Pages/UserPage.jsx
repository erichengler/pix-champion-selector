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
					src="images/pix-full.png" 
					style={{ width: '900px', border: '1px solid black', cursor: 'pointer' }}
					onClick={toChampionsPage}
				/>
				<br /><br />
				<span>Click the image of Pix to get help deciding what champion to play.</span>
			</center>			
		</div>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
