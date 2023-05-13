import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChampionItem from '../ChampionItem/ChampionItem';

function ChampionsPage() {

	// GET all champions from database
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
	}, []);

	const dispatch = useDispatch();
	const history = useHistory();

	// Brings user back to Home (UserPage)
	const backToHome = () => {
		history.push('/');
	}

	// Storing all champions
	const champions = useSelector(store => store.champions);

	return (
		<div className="container">
			<h2>Champion List</h2>

			{/* Maps through all champions */}
			{
				champions.map((champion) => (
					<ChampionItem 
						key={champion.id} 
						champion={champion} />
				))
			}
			<br /><br /><br />

			{/* Back to Home Button */}
			<button onClick={backToHome}>Back</button>
		</div>
	);
}

export default ChampionsPage;