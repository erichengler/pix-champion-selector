import { useSelector } from 'react-redux';

function UserPage() {

	// --------- Storing user data ---------
	const user = useSelector(store => store.user);

	return (
		<div className="container">

			{/* ------- Welcome, user information ------- */}
			<h2>Welcome, {user.username}!</h2>
			<p>Your ID is: {user.id}</p>
			<br /><br />
		</div>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
