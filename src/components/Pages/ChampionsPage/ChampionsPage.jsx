import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChampionFilter from './ChampionFilter';
import ChampionItem from './ChampionItem/ChampionItem';
import DisableFilter from '../../Checkboxes/DisableFilter';
import IncludeBlacklist from '../../Checkboxes/IncludeBlacklist';
import RollButton from '../../Buttons/RollButton';

import { Typography, TextField } from '@mui/material';

function ChampionsPage() {

	const dispatch = useDispatch();

	// ------- Fetch champions, user's blacklist -------
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
		dispatch({ type: 'FETCH_BLACKLIST' });
	}, []);

	// ------- Storing all champions, user notes, user filter,  -------
	// ------- filteredChampions, user blacklist, and checkboxToggle -------
	let { champions, notes, filter, filteredChampions,
		blacklist, checkboxToggle } = useSelector(state => state);

	// ------- State for search query -------
	const [searchQuery, setSearchQuery] = useState('');

	// ------- Checking if filter is empty -------
	let emptyFilter;
	if (filter.class === '' & filter.region === '' & filter.notes === ''
		& filter.minDifficulty === '1' & filter.maxDifficulty === '10') {
		emptyFilter = true;
	} else {
		emptyFilter = false;
	}

	// ------- If filter is empty, display all champions -------
	if (emptyFilter === true) {
		filteredChampions = champions
	}

	// ------- Start disable filter, include blacklist logic -------
	const modifiedChampions = checkboxToggle.disableFilter
		? checkboxToggle.includeBlacklist
			? champions
			: champions.filter(champion => !blacklist.some(
				blacklisted => blacklisted.champion_id === champion.id
			))
		: checkboxToggle.includeBlacklist
			? filteredChampions
			: filteredChampions.filter(champion => !blacklist.some(
				blacklisted => blacklisted.champion_id === champion.id
			));
	// ------- End disable filter, include blacklist logic -------

	// ------- Filter champions using search query -------
	const displayedChampions = modifiedChampions.filter((champion) =>
		champion.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="container" style={{ textAlign: 'center' }}>
			<Typography variant="h3">
				Champions
			</Typography>
			<br /><br />

			{/* ------- User filter ------- */}
			<div>
				<ChampionFilter
					champions={champions}
					notes={notes}
					filter={filter}
				/>
			</div>
			<br /><hr /><br />

			{/* ------- Search by name ------- */}
			<Typography>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search by name..."
				/>

				{/* ------- Disable filter checkbox ------- */}
				<DisableFilter
					emptyFilter={emptyFilter}
					checkboxToggle={checkboxToggle}
				/>

				{/* ------- Include blacklist checkbox ------- */}
				<IncludeBlacklist
					blacklist={blacklist}
					checkboxToggle={checkboxToggle}
				/>
			</Typography>

			{/* ------- Maps through champions ------- */}
			<div style={{ textAlign: 'center' }}>
				{
					displayedChampions.map((champion) => (
						<ChampionItem
							key={champion.id}
							champion={champion}
						/>
					))
				}
			</div>
			<br />

			{/* ------- Roll button ------- */}
			<RollButton
				championPool={modifiedChampions}
				style={{}}
			/>
		</div>
	);
}

export default ChampionsPage;