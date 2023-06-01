import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import FavoriteButton from '../Buttons/FavoriteButton';
import NotesButton from '../Buttons/NotesButton'
import BlacklistButton from '../Buttons/BlacklistButton';
import RollButton from '../Buttons/RollButton';
import BackButton from '../Buttons/BackButton';

// ------- MUI Imports -------
import { Container, Typography, Grid } from '@mui/material';

function ResultPage() {

    const dispatch = useDispatch();

    // ------- Fetch champions -------
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
    }, []);

    // ------- Storing result and champions -------
    const { result, champions } = useSelector(state => state);

    return (
        // ------- Prevent error when result is undefined -------
        result.champion === undefined
            ? <h2 className='container'>Please go back and roll again.</h2>
            :

            <Container className='container' sx={{ marginTop: '10px' }}>

                {/* ------- Pix message ------- */}
                <Typography variant='h5' textAlign='center'>
                    Pix thinks you should play...
                </Typography>

                {/* ------- Pix image ------- */}
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="images/pix-full.jpg"
                        style={{
                            border: '1px solid black',
                            marginTop: '25px', marginBottom: '25px',
                            width: '900px'
                        }}
                    />
                </div>
                <br />

                <div style={{ textAlign: 'center' }}>
                        <Grid container spacing={2} sx={{ 
                            maxWidth: '830px',
                            margin: '0 auto'
                        }}>
                            <Grid item xs={9.3} sx={{ 
                                textAlign: 'left', 
                                display: 'inline-block' 
                            }}>

                                {/* ------- Result name ------- */}
                                <Typography variant='h4'>
                                    <b>{result.champion.name}</b>
                                </Typography>

                                {/* ------- Result title ------- */}
                                <Typography>
                                    <i>{result.champion.title}</i>
                                </Typography>

                            </Grid>

                            <Grid item xs={2.7} sx={{ marginTop: '25px' }}>

                                {/* ------- Favorite button ------- */}
                                <FavoriteButton result={result} />

                                {/* ------- Notes button ------- */}
                                <NotesButton result={result} />

                                {/* ------- Blacklist button ------- */}
                                <BlacklistButton result={result} />

                            </Grid>
                        </Grid>
                </div>

                <div style={{ textAlign: 'center' }}>

                    {/* ------- Result image ------- */}
                    <img src={result.champion.imageSplash} style={{
                        width: '800px',
                        marginBottom: '7px',
                        marginTop: '7px',
                        border: '1px solid black'
                    }} />
                </div>
                <br />

                <div style={{ textAlign: 'center' }}>

                    {/* ------- Back button ------- */}
                    <BackButton /> &nbsp;

                    {/* ------- Reroll button ------- */}
                    <RollButton
                        result={result}
                        champions={champions}
                    />
                </div>
            </Container>
    );
}

export default ResultPage;