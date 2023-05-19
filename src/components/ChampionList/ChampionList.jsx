import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChampionItem from '../ChampionItem/ChampionItem';
import RollButton from '../RollButton/RollButton';

function ChampionsPage() {

	const dispatch = useDispatch();
	const history = useHistory();

	// ------- GET all champions from database -------
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
		dispatch({ type: 'FETCH_BLACKLIST' });
		dispatch({ type: 'FETCH_FILTERED_CHAMPIONS' });
	}, []);

	// ------- Storing champions, filteredChampions and blacklist -------
	const champions = useSelector(store => store.champions);
	const blacklist = useSelector(store => store.blacklist);
	const filteredChampions = useSelector(store => store.filteredChampions);

	// ------- Search query state -------
	const [searchQuery, setSearchQuery] = useState('');

	// ------- Filter champions using search query -------
	// ! Change champions.filter to filteredChampions.filter when filter is working
	const filteredBySearch = champions.filter((champion) => 
		champion.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// ------- Brings user back to Home -------
	const backToHome = () => {
		history.push('/');
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
				filteredBySearch.map((champion) => (
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
			{/* ! CHANGE champions to filtered champions when filter works ! */}
			<RollButton 
				champions={champions}
			/>
		</div>
	);
}

export default ChampionsPage;