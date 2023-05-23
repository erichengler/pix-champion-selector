import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChampionItem from '../ChampionItem/ChampionItem';
import Checkboxes from '../Checkboxes/Checkboxes';
import RollButton from '../RollButton/RollButton';

function ChampionsPage() {

	const dispatch = useDispatch();
	const history = useHistory();

	// ------- Fetch champions, filtered champions, blacklist -------
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
		dispatch({ type: 'FETCH_BLACKLIST' });
	}, []);

	// ------- Storing champions, filteredChampions, blacklist, checkboxes -------
	const champions = useSelector(store => store.champions);
	const filteredChampions = useSelector(store => store.filteredChampions);
	const blacklist = useSelector(store => store.blacklist);
	const checkboxToggle = useSelector(store => store.checkboxToggle);

	// ------- State for search query -------
	const [searchQuery, setSearchQuery] = useState('');

	// ------- Start disable filter, include blacklist -------
	const displayedChampions = checkboxToggle.disableFilter
		? (checkboxToggle.includeBlacklist ? champions
			: champions.filter(champion => {
				return !blacklist.some(
					blacklisted => blacklisted.champion_id === champion.id
				);
			}))
		: (checkboxToggle.includeBlacklist ? filteredChampions
			: filteredChampions.filter(champion => {
				return !blacklist.some(
					blacklisted => blacklisted.champion_id === champion.id
				);
			}));
	// ------- End disable filter, include blacklist -------

	// ------- Filter champions using search query -------
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
				placeholder="Search..."
			/>
			<br />

			{/* ------- Disable filter, include blacklist ------- */}
			<Checkboxes 
				champions={champions}
				filteredChampions={filteredChampions}
				blacklist={blacklist}
				checkboxToggle={checkboxToggle}
			/>

			{/* ------- Maps through champions ------- */}
			{
				filteredBySearch.map((champion) => (
					<ChampionItem
						key={champion.id}
						champion={champion} 
					/>
				))
			}
			<br /><br /><br />

			{/* ------- Back to home button ------- */}
			<button onClick={backToHome}>Back</button>
			&nbsp; &nbsp;

			{/* ------- Roll button ------- */}
			<RollButton
				filteredChampions={displayedChampions}
			/>
		</div>
	);
}

export default ChampionsPage;