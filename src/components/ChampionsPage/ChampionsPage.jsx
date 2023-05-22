import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChampionItem from '../ChampionItem/ChampionItem';
import RollButton from '../RollButton/RollButton';

function ChampionsPage() {

	const dispatch = useDispatch();
	const history = useHistory();

	// ------- GET champions, filtered champions, blacklist from database -------
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
		dispatch({ type: 'FETCH_FILTERED_CHAMPIONS' });
		dispatch({ type: 'FETCH_BLACKLIST' });
	}, []);

	// ------- Storing champions, filteredChampions, blacklist, checkboxes -------
	const champions = useSelector(store => store.champions);
	const filteredChampions = useSelector(store => store.filteredChampions);
	const blacklist = useSelector(store => store.blacklist);
	const checkboxes = useSelector(store => store.checkboxes);

	// ------- State for search query -------
	const [searchQuery, setSearchQuery] = useState('');

	// ------- Toggle state change for checkboxes -------
	const toggleDisableFilter = () => {
		dispatch({ type: 'TOGGLE_DISABLE_FILTER' });
	}
	const toggleIncludeBlacklist = () => {
		dispatch({ type: 'TOGGLE_INCLUDE_BLACKLIST' });
	}

	// ------- Logic for disable filter, include blacklist -------
	const displayedChampions = checkboxes.disableFilter
		? (checkboxes.includeBlacklist ? champions
			: champions.filter(champion => {
				return !blacklist.some(
					blacklisted => blacklisted.champion_id === champion.id
				);
			}))
		: (checkboxes.includeBlacklist ? filteredChampions
			: filteredChampions.filter(champion => {
				return !blacklist.some(
					blacklisted => blacklisted.champion_id === champion.id
				);
			}));

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

			{/* ------- Disable filter checkbox ------- */}
			{filteredChampions.length === champions.length
				? ''
				: <label>
					<input
						type="checkbox"
						checked={checkboxes.disableFilter}
						onChange={toggleDisableFilter}
					/>
					Disable filter
				</label>
			} &nbsp;

			{/* ------- Include blacklist checkbox ------- */}
			{blacklist.length === 0
				? ''
				: <label>
					<input
						type="checkbox"
						checked={checkboxes.includeBlacklist}
						onChange={toggleIncludeBlacklist}
					/>
					Include blacklisted
				</label>
			}
			<br />

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
				filteredChampions={displayedChampions}
			/>
		</div>
	);
}

export default ChampionsPage;