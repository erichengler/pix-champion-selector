import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// ------- MUI Imports -------
import { Button, Typography, Grid } from '@mui/material';

function ChampionFilter({ champions, notes, filter }) {

    const dispatch = useDispatch();

    // --------- Fetch champions From database ---------
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
        dispatch({ type: 'FETCH_NOTES' });
    }, []);

    // ------- Calculating filtered champions -------
    // ------- Triggers any time filter changes -------
    useEffect(() => {
        const filteredChampions = champions.filter(champion => {

            // ------- Filter by class -------
            if (filter.class && !champion.class.includes(filter.class)) {
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
        // ------- Sending to filteredChampions reducer -------
        dispatch({ type: 'SET_FILTERED_CHAMPIONS', payload: filteredChampions });
    }, [filter]);


    // ------- handleChange for filter form -------
    const handleFilterChange = (property) => {
        return (event) => {
            const newFilter = { ...filter, [property]: event.target.value };
            dispatch({ type: 'UPDATE_FILTER', payload: newFilter });
        }
    }

    // --------- Reset user filters ---------
    const resetFilter = (event) => {
        event.preventDefault();
        document.getElementById("filterForm").reset();
        dispatch({ type: 'RESET_FILTER' });
    }

    return (
        <div className='container' style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            {/* ------- Champions filter form ------- */}
            <form id='filterForm'>
                <Grid container spacing={0} sx={{ minWidth: '545px' }}>

                    <Grid item xs={6.6}>

                        {/* ------- Filter by class text ------- */}
                        <Typography sx={{
                            textAlign: 'left',
                            marginBottom: '25px'
                        }}>
                            {/* ------- Link to class information ------- */}
                            <a
                                href="https://leagueoflegends.fandom.com/wiki/Champion_classes"
                                target="_blank"
                            >
                                Class
                            </a>
                            :
                            &nbsp; &nbsp;
                            {/* ------- Class select ------- */}
                            <select
                                id="classFilter"
                                value={filter.class}
                                onChange={handleFilterChange('class')}
                                style={{
                                    width: '170px',
                                    height: '30px',
                                    textAlign: 'center'
                                }}
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
                        </Typography>

                        {/* ------- Filter by region text ------- */}
                        <Typography sx={{
                            textAlign: 'left'
                        }}>
                            {/* ------- Link to region information ------- */}
                            <a
                                href="https://universe.leagueoflegends.com/en_US/regions"
                                target="_blank"
                            >
                                Region
                            </a>
                            : &nbsp;
                            {/* ------- Region select ------- */}
                            <select
                                id="regionFilter"
                                value={filter.region}
                                onChange={handleFilterChange('region')}
                                style={{
                                    width: '170px',
                                    height: '30px',
                                    textAlign: 'center'
                                }}
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
                        </Typography>
                    </Grid>

                    <Grid item xs={5.4}>

                        {/* ------- Filter by difficulty text ------- */}
                        <Typography sx={{
                            textAlign: 'left',
                            marginBottom: '25px',
                        }}>
                            Difficulty: &nbsp;

                            {/* ------- Min difficulty select ------- */}
                            <select
                                id="minDifficultyFilter"
                                value={filter.minDifficulty}
                                onChange={handleFilterChange('minDifficulty')}
                                style={{
                                    width: '50px',
                                    height: '25px',
                                    textAlign: 'center'
                                }}
                            >
                                {/* ------- Min difficulty options ------- */}
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

                            {/* ------- Max difficulty select ------- */}
                            <select
                                id="maxDifficultyFilter"
                                value={filter.maxDifficulty}
                                onChange={handleFilterChange('maxDifficulty')}
                                style={{
                                    width: '50px',
                                    height: '25px',
                                    textAlign: 'center'
                                }}
                            >
                                {/* ------- Max difficulty options ------- */}
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
                        </Typography>

                        {/* ------- Filter by notes text ------- */}
                        <Typography sx={{ textAlign: 'left' }}>
                            Notes:&nbsp;

                            {/* ------- Notes input ------- */}
                            <input
                                id="notesFilter"
                                type="text"
                                value={filter.notes}
                                onChange={handleFilterChange('notes')}
                                style={{
                                    width: '150px',
                                    height: '25px',
                                    textAlign: 'center'
                                }}
                            />
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{
                        textAlign: 'center',
                        marginTop: '25px'
                    }}>

                        {/* ------- Reset button ------- */}
                        <Button sx={{ 
                            boxShadow: 3, 
                            backgroundColor: '#a7a7cc' 
                        }}
                            color="inherit"
                            variant='outlined'
                            onClick={resetFilter}
                        >
                            Reset
                        </Button> &nbsp;
                    </Grid>
                </Grid>
            </form>
        </div >
    );
}

export default ChampionFilter;