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

	// TODO: Send newFilter to server and store in reducer
	const roll = () => {
		console.log('Filter:', newFilter);
		// Dispatch to send filter goes here
		setFilter({
			class: '',
			minDifficulty: '1',
			maxDifficulty: '10',
			region: '',
			notes: ''
		});
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
