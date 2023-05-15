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

	// Storing all champions
	const champions = useSelector(store => store.champions);

	// Brings user back to Home (UserPage)
	const backToHome = () => {
		history.push('/');
	}

	// Sets random result from full champion list
	// Brings user to result page
	const roll = () => {
		const random = Math.floor(Math.random() * champions.length);
		console.log(champions[random]);
		dispatch({ type: 'SET_RESULT', payload: champions[random] });

		history.push('/result')
	}

	return (
		<div className="container">
			<h2>Champion List</h2>

			{/* Search by name */}
			<label for="championSearch">Search by Name:</label>
			<br />
			<input type="search" id="championSearch" />
			<br/> <br />

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
			&nbsp; &nbsp;

			{/* Roll from list button */}
			<button onClick={roll}>Roll</button>
		</div>
	);
}

export default ChampionsPage;