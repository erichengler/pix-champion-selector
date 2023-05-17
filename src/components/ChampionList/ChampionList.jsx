import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChampionItem from '../ChampionItem/ChampionItem';

function ChampionsPage() {

	// ------- GET all champions from database -------
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
	}, []);

	const dispatch = useDispatch();
	const history = useHistory();

	// ------- Storing champions, filteredChampions -------
	const champions = useSelector(store => store.champions);
	const filteredChampions = useSelector(store => store.filteredChampions);

	// ------- Brings user back to Home -------
	const backToHome = () => {
		history.push('/');
	}

	// ------- Sets random result from full champion list -------
	const roll = () => {
		const random = Math.floor(Math.random() * champions.length);
		console.log(champions[random]);
		dispatch({ type: 'SET_RESULT', payload: champions[random] });
		// ------- Brings user to result page -------
		history.push('/result')
	}

	return (
		<div className="container">
			<h2>Champion List</h2>

			{/* ------- Search by name ------- */}
			<label htmlFor="championSearch">Search by Name:</label>
			<br />
			<input type="search" id="championSearch" />
			<br/> <br />

			{/* ------- Maps through all champions ------- */}
			{
				champions.map((champion) => (
					<ChampionItem
						key={champion.id}
						champion={champion} />
				))
			}
			<br /><br /><br />

			{/* ------- Back to home button ------- */}
			<button onClick={backToHome}>Back</button>
			&nbsp; &nbsp;

			{/* ------- Roll button ------- */}
			<button onClick={roll}>Roll</button>
		</div>
	);
}

export default ChampionsPage;