import React from 'react';
import LogOutButton from '../Nav/LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function UserPage() {
	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const user = useSelector((store) => store.user);
	return (
		<div className="container">
			<h2>Welcome, {user.username}!</h2>
			<p>Your ID is: {user.id}</p>
			{/* <LogOutButton className="btn" /> */}
			<br /><br />
			<h3>Filter Champions</h3>

			{/* Filter by Class */}
			By Class:
			<br />
			<select id="classFilter">
				<option value="0" selected>All Classes</option>
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
			{/* Min Difficulty */}
			<select>
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
			{/* Max Difficulty */}
			<select>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10" selected>10</option>
			</select>
			<br /><br />

			{/* Filter by Region */}
			By Region:
			<br />
			<select>
				<option value="0" selected>All Regions</option>
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
			<input type="text" />
			<br /><br />

			{/* Buttons */}
			<button>Reset Filters</button> &nbsp; <button>Roll</button>
		</div>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
