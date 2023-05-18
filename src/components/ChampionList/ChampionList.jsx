import { useEffect, useState } from 'react';
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

	// ------- Search query state -------
	const [searchQuery, setSearchQuery] = useState('');

	// ------- Filter champions using search query -------
	// ! Change champions.filter to filteredChampions.filter when filter is working
	const filteredChampionsBySearch = champions.filter((champion) => 
		champion.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// ------- Brings user back to Home -------
	const backToHome = () => {
		history.push('/');
	}

	// ------- Sets random result from full champion list -------
	// ! Change champions to filteredChampions when filter is working
	const roll = () => {
		const random = Math.floor(Math.random() * champions.length);
		dispatch({ type: 'SET_RESULT', payload: champions[random] });
		// ------- Brings user to result page -------
		history.push('/result')
	}

	return (
		<div className="container">
			<h2>Champion List</h2>

			{/* ------- Search by name ------- */}
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search champions..."
			/>
			<br /> <br />

			{/* ------- Maps through all champions ------- */}
			{
				filteredChampionsBySearch.map((champion) => (
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