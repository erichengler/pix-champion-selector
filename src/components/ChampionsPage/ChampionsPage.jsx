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
		dispatch({ type: 'FETCH_FILTERED_CHAMPIONS' });
		dispatch({ type: 'FETCH_BLACKLIST' });
	}, []);

	// ------- Storing champions, filteredChampions and blacklist -------
	const champions = useSelector(store => store.champions);
	const filteredChampions = useSelector(store => store.filteredChampions);
	const blacklist = useSelector(store => store.blacklist);


	// ------- Search query, include blacklist states -------
	const [searchQuery, setSearchQuery] = useState('');
	const [includeBlacklist, setIncludeBlacklist] = useState(false);

	// ------- Include blacklist checkbox logic -------
	const displayedChampions = includeBlacklist
		? champions
		: champions.filter(champion => {
			return !blacklist.some(
				blacklisted => blacklisted.champion_id === champion.id
			);
		});

	// ------- Filter champions using search query -------
	// ! Change champions.filter to filteredChampions.filter when filter is working
	const filteredBySearch = displayedChampions.filter((champion) =>
		champion.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// ------- Brings user back to Home -------
	const backToHome = () => {
		history.push('/');
	}

	return (
		<div className="container">
			<h2>Champions</h2>

			{/* ------- Search by name ------- */}
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search champions..."
			/>
			<br />

			{/* ------- Include blacklist checkbox ------- */}
			<label>
				<input
					type="checkbox"
					checked={includeBlacklist}
					onChange={event => setIncludeBlacklist(event.target.checked)}
				/>
				Include blacklisted
			</label>
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