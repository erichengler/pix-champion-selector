import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FavoriteItem from './FavoriteItem';
import RollButton from '../../Buttons/RollButton';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function FavoritesPage() {

    const dispatch = useDispatch();

    // ------- Fetch champions and favorites -------
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    // ------- Storing champions, favorites -------
    const champions = useSelector(store => store.champions);
    const favorites = useSelector(store => store.favorites);

    return (
        <div>
            {/* ------- Checking for champions ------- */}
            {champions.length === 0 ? (
                <div className="container">
                    <h2>Loading...</h2>
                </div>
            ) : (

                // ------- Checking for favorites -------
                favorites.length === 0 ? (
                    <div className="container">
                        <h2>No Favorites</h2>
                    </div>
                ) : (

                    <Container className="container" maxWidth='xl'>
                        <Typography variant="h3" textAlign='center'>
                            Favorites
                        </Typography>
                        <br />

                        <Grid container spacing={0} justifyContent='center'>
                            {/* ------- Mapping through favorites ------- */}
                            {/* ------- and matching by champion_id ------- */}
                            {
                                favorites.map((favorite) => (
                                    <FavoriteItem
                                        key={favorite.id}
                                        champions={champions}
                                        favorite={favorite}
                                    />
                                ))
                            }
                        </Grid>
                        <br />
                        
                        {/* ------- Roll button ------- */}
                        <center>
                            <RollButton
                                champions={champions}
                                favorites={favorites}
                            />
                        </center>
                    </Container>
                ))
            }
        </div>
    );
}

export default FavoritesPage;