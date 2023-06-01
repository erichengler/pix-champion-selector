import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import FavoriteButton from "../Buttons/FavoriteButton";
import NotesButton from "../Buttons/NotesButton";
import BlacklistButton from "../Buttons/BlacklistButton";
import BackButton from "../Buttons/BackButton";

// ------- MUI Imports -------
import { Card, Container, CardMedia, Typography, Grid } from '@mui/material';

function DetailsPage() {

    let { id } = useParams();
    const dispatch = useDispatch();

    // ------- Fetch this champion and favorites -------
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: id });
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    // ------- Storing this champion -------
    const champion = useSelector(store => store.thisChampion);

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Card sx={{
                width: '800px',
                padding: '30px',
                paddingTop: '22px',
                marginTop: '35px',
                boxShadow: 6,
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={9.85}>
                        {/* ------- Champion name ------- */}
                        <Typography variant="h4">
                            <b>{champion[0].name}</b>
                        </Typography>

                        {/* ------- Champion title ------- */}
                        <Typography>
                            <i>{champion[0].title}</i>
                        </Typography>
                    </Grid>

                    <Grid item xs={2.15} style={{ marginTop: '25px' }}>
                        {/* ------- Favorite button ------- */}
                        <FavoriteButton
                            id={id}
                        />

                        {/* ------- Notes button ------- */}
                        <NotesButton
                            champion={champion}
                        />

                        {/* ------- Blacklist button ------- */}
                        <BlacklistButton
                            id={id}
                        />
                    </Grid>
                </Grid>

                {/* ------- Champion image ------- */}
                <CardMedia>
                    <img
                        src={champion[0].imageSplash}
                        style={{
                            width: '798px',
                            marginBottom: '7px',
                            marginTop: '7px',
                            border: '1px solid black',
                        }}
                    />
                </CardMedia>

                {/* ------- Class, difficulty and region ------- */}
                <center>
                    <Typography>
                        {/* This turns "{Enchanter,Warden}" into "Enchanter, Warden" */}
                        Class: {champion[0].class.slice(1, -1)
                            .split(',').map(classItem => classItem
                                .trim()).join(', ')} &nbsp; • &nbsp;
                        Difficulty: {champion[0].difficulty} &nbsp; • &nbsp;
                        Region: {champion[0].region}
                    </Typography>
                    <br />

                    {/* ------- Champion lore ------- */}
                    <Typography
                        sx={{ width: '750px' }}
                    >
                        {champion[0].lore}
                    </Typography>
                    <br />

                    {/* ------- Back button ------- */}
                    <BackButton />
                </center>
            </Card>
        </Container>
    );
}

export default DetailsPage;