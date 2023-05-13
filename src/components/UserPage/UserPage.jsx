import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

function UserPage() {

	// Storing user information
	const user = useSelector((store) => store.user);

	const history = useHistory();
	const dispatch = useDispatch();

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

	// TODO: Send newFilter to server in this function 
	// TODO: (store in reducer?)
	const roll = () => {
		console.log(newFilter);
		history.push('/champions');
	}

	return (
		<div className="container">

			{/* Welcome, user information */}
			<h2>Welcome, {user.username}!</h2>
			<p>Your ID is: {user.id}</p>
			<br /><br />

			{/* Champions Filter */}
			<h3>Filter Champions</h3>

			{/* Filter by Class */}
			By Class:
			<br />
			<select id="classFilter" onChange={handleClassChange}>
				<option value="0">All Classes</option>
				<option value="1">Enchanter</option>
				<option value="2">Catcher</option>
				<option value="3">Juggernaut</option>
				<option value="4">Diver</option>
				<option value="5">Burst</option>
				<option value="6">Battlemage</option>
				<option value="7">Artillery</option>
				<option value="8">Marksman</option>
				<option value="9">Assassin</option>
				<option value="10">Skirmisher</option>
				<option value="11">Vanguard</option>
				<option value="12">Warden</option>
				<option value="13">Specialist</option>
			</select>
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

			{/* Filter by Region */}
			By Region:
			<br />
			<select onChange={handleRegionChange}>
				<option value="0">All Regions</option>
				<option value="1">Bandle City</option>
				<option value="2">Bilgewater</option>
				<option value="3">Demacia</option>
				<option value="4">Ionia</option>
				<option value="5">Ixtal</option>
				<option value="6">Noxus</option>
				<option value="7">Piltover</option>
				<option value="8">Shadow Isles</option>
				<option value="9">Shurima</option>
				<option value="10">Targon</option>
				<option value="11">The Freljord</option>
				<option value="12">The Void</option>
				<option value="13">Zaun</option>
				<option value="13">Runeterra</option>
			</select>
			<br /><br />

			{/* Filter by Notes */}
			By Notes:
			<br />
			<input type="text" onChange={handleNotesChange} />
			<br /><br />

			{/* Buttons */}
			<button>Reset Filters</button> &nbsp;
			<button onClick={roll}>Roll</button>
		</div>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
