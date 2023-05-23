import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ChampionFilter() {

    const dispatch = useDispatch();

    // --------- Fetch champions From database ---------
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
        dispatch({ type: 'FETCH_NOTES' });
    }, []);

    const champions = useSelector(store => store.champions);
    const notes = useSelector(store => store.notes);
    const filter = useSelector(store => store.filter);


    // ------- Start of handleChange for filter form -------
    const handleClassChange = (event) => {
        const newFilter = { ...filter, class: event.target.value };
        dispatch({ type: 'UPDATE_FILTER', payload: newFilter });
        dispatch({ type: 'SET_FILTERED_CHAMPIONS', payload: filteredChampions });
    }
    const handleRegionChange = (event) => {
        const newFilter = { ...filter, region: event.target.value };
        dispatch({ type: 'UPDATE_FILTER', payload: newFilter });
        dispatch({ type: 'SET_FILTERED_CHAMPIONS', payload: filteredChampions });
    }
    const handleMinDiffChange = (event) => {
        const newFilter = { ...filter, minDifficulty: event.target.value };
        dispatch({ type: 'UPDATE_FILTER', payload: newFilter });
        dispatch({ type: 'SET_FILTERED_CHAMPIONS', payload: filteredChampions });
    }
    const handleMaxDiffChange = (event) => {
        const newFilter = { ...filter, maxDifficulty: event.target.value };
        dispatch({ type: 'UPDATE_FILTER', payload: newFilter });
        dispatch({ type: 'SET_FILTERED_CHAMPIONS', payload: filteredChampions });
    }
    const handleNotesChange = (event) => {
        const newFilter = { ...filter, notes: event.target.value };
        dispatch({ type: 'UPDATE_FILTER', payload: newFilter });
        dispatch({ type: 'SET_FILTERED_CHAMPIONS', payload: filteredChampions });
    }
    // ------- End of handleChange for filter form -------


    // --------- Reset user filters ---------
    const resetFilter = (event) => {
        event.preventDefault();
        document.getElementById("filterForm").reset();
        dispatch({ type: 'RESET_FILTER' });
    }

    const filteredChampions = champions.filter(champion => {

        // ------- Filter by class -------
        if (filter.class && champion.class !== filter.class) {
            return false;
        }

        // ------- Filter by region -------
        if (filter.region && champion.region !== filter.region) {
            return false;
        }

        // ------- Filter by difficulty -------
        if (
            parseInt(champion.difficulty) < parseInt(filter.minDifficulty) ||
            parseInt(champion.difficulty) > parseInt(filter.maxDifficulty)
        ) {
            return false;
        }

        // ------- Filter by notes -------
        if (filter.notes) {
            const championNotes = notes.filter(note =>
                note.champion_id === champion.id);
            const filteredNotes = championNotes.filter(note =>
                note.note.toLowerCase().includes(filter.notes.toLowerCase()));

            if (filteredNotes.length === 0) {
                return false;
            }
        }
        return true;
    });

    return (
        <div className="container">
            {/* ------- Champions filter ------- */}
            <form id='filterForm'>

                {/* ------- Filter by class ------- */}
                By Class: &nbsp;
                <select
                    id="classFilter"
                    value={filter.class}
                    onChange={handleClassChange}
                >
                    {/* ------- Class options ------- */}
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

                {/* ------- Link to classes info ------- */}
                <a
                    href="https://leagueoflegends.fandom.com/wiki/Champion_classes"
                    target="_blank"
                >
                    Read about classes
                </a>
                <br /><br />

                {/* ------- Filter by region ------- */}
                By Region: &nbsp;
                <select
                    id="regionFilter"
                    value={filter.region}
                    onChange={handleRegionChange}
                >
                    {/* ------- Region options ------- */}
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

                {/* ------- Link to regions info ------- */}
                <a
                    href="https://universe.leagueoflegends.com/en_US/regions"
                    target="_blank"
                >
                    Read about regions
                </a>
                <br /><br />

                {/* ------- Filter by difficulty ------- */}
                By Difficulty:
                <br />
                From &nbsp;

                {/* ------- Minimum difficulty ------- */}
                <select
                    id="minDifficultyFilter"
                    value={filter.minDifficulty}
                    onChange={handleMinDiffChange}
                >
                    {/* ------- Difficulty options ------- */}
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

                {/* ------- Maximum difficulty ------- */}
                <select
                    id="maxDifficultyFilter"
                    value={filter.maxDifficulty}
                    onChange={handleMaxDiffChange}
                >
                    {/* ------- Difficulty options ------- */}
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

                {/* ------- Filter by notes ------- */}
                By Notes:
                <br />
                <input
                    id="notesFilter"
                    type="text"
                    value={filter.notes}
                    onChange={handleNotesChange}
                />
                <br /><br />

                {/* ------- Buttons ------- */}
                <button onClick={resetFilter}>Reset</button> &nbsp;
            </form>
        </div>
    )
}
;

export default ChampionFilter;