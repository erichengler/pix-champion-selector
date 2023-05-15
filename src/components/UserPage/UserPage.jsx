import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

function UserPage() {

	// Storing user information
	const user = useSelector((store) => store.user);

	// Storing all champions
	const champions = useSelector((store) => store.champions);

	// Storing filtered champions
	const filteredChampions = useSelector((store) => store.filteredChampions);

	const history = useHistory();
	const dispatch = useDispatch();

	// GET all champions from database
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
	}, []);

	// User filter
	let [newFilter, setFilter] = useState({
		class: '',
		minDifficulty: '1',
		maxDifficulty: '10',
		region: '',
		notes: ''
	});

	// --------- START of handleChange ---------
	const handleClassChange = (event) => {
		setFilter({ ...newFilter, class: event.target.value });
	}
	const handleMinDifficultyChange = (event) => {
		setFilter({ ...newFilter, minDifficulty: event.target.value });
	}
	const handleMaxDifficultyChange = (event) => {
		setFilter({ ...newFilter, maxDifficulty: event.target.value });
	}
	const handleRegionChange = (event) => {
		setFilter({ ...newFilter, region: event.target.value });
	}
	const handleNotesChange = (event) => {
		setFilter({ ...newFilter, notes: event.target.value });
	}
	// --------- END of handleChange ---------

	// Resets filters to default values
	const resetFilters = (event) => {
		event.preventDefault();
		document.getElementById("filterForm").reset();
		setFilter({
			class: '',
			minDifficulty: '1',
			maxDifficulty: '10',
			region: '',
			notes: ''
		});
	}

	// ! Use newFilter to add champions to filteredChampions reducer
	const roll = (event) => {
		event.preventDefault();
		console.log('Rolling with this filter:', newFilter);

	// ! FILTER WITH forEach GOES HERE

		console.log('Filtered List:', filteredChampions);
		// Dispatch to 'SET_FILTERED_CHAMPIONS' using newFilter
		dispatch({ type: 'SET_FILTERED_CHAMPIONS', payload: filteredChampions });
		setFilter({
			class: '',
			minDifficulty: '1',
			maxDifficulty: '10',
			region: '',
			notes: ''
		});
		history.push('/result');
	}

	return (
		<div className="container">

			{/* Welcome, User Information */}
			<h2>Welcome, {user.username}!</h2>
			<p>Your ID is: {user.id}</p>
			<br /><br />

			{/* Champions Filter */}
			<form id='filterForm'>
				<h3>Filter Champions</h3>

				{/* Filter by Class */}
				By Class: &nbsp;
				<select id="classFilter" onChange={handleClassChange}>
					<option value="">All Classes</option>
					<option value="Enchanter">Enchanter</option>
					<option value="Catcher">Catcher</option>
					<option value="Juggernaut">Juggernaut</option>
					<option value="Diver">Diver</option>
					<option value="Burst">Burst</option>
					<option value="Battlemage">Battlemage</option>
					<option value="Artillery">Artillery</option>
					<option value="Marksman">Marksman</option>
					<option value="Assassin">Assassin</option>
					<option value="Skirmisher">Skirmisher</option>
					<option value="Vanguard">Vanguard</option>
					<option value="Warden">Warden</option>
					<option value="Specialist">Specialist</option>
				</select>
				<br />

				{/* Link to Classes Info */}
				<a 
					href="https://leagueoflegends.fandom.com/wiki/Champion_classes"
					target="_blank"
				>	
					Read about classes
				</a>
				<br /><br />

				{/* Filter by Region */}
				By Region: &nbsp;
				<select onChange={handleRegionChange}>
					<option value="">All Regions</option>
					<option value="Bandle City">Bandle City</option>
					<option value="Bilgewater">Bilgewater</option>
					<option value="Demacia">Demacia</option>
					<option value="Ionia">Ionia</option>
					<option value="Ixtal">Ixtal</option>
					<option value="Noxus">Noxus</option>
					<option value="Piltover">Piltover</option>
					<option value="Shadow Isles">Shadow Isles</option>
					<option value="Shurima">Shurima</option>
					<option value="Targon">Targon</option>
					<option value="The Freljord">The Freljord</option>
					<option value="The Void">The Void</option>
					<option value="Zaun">Zaun</option>
					<option value="Runeterra">Runeterra</option>
				</select>
				<br />

				{/* Link to Regions info */}
				<a 
					href="https://universe.leagueoflegends.com/en_US/regions"
					target="_blank"
				>
					Read about regions
				</a>
				<br /><br />

				{/* Filter by Difficulty */}
				By Difficulty:
				<br />
				From &nbsp;

				{/* Minimum Difficulty */}
				<select onChange={handleMinDifficultyChange}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
				&nbsp; to &nbsp;

				{/* Maximum Difficulty */}
				<select defaultValue={10} onChange={handleMaxDifficultyChange}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
				<br /><br />

				{/* Filter by Notes */}
				By Notes:
				<br />
				<input type="text" onChange={handleNotesChange} />
				<br /><br />

				{/* Buttons */}
				<button onClick={resetFilters}>Reset</button> &nbsp;
				<button onClick={roll}>Roll</button>
			</form>
		</div>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
