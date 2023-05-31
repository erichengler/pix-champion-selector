import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NotesButton from '../../Buttons/NotesButton';

// ------- MUI Imports -------
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import PortraitIcon from '@mui/icons-material/Portrait';

function FavoriteItem({ favorite, champions }) {

    const history = useHistory();
    const dispatch = useDispatch();

    // ------- Brings user to champion details -------
    const toDetails = (event) => {
        history.push(`/champions/${event.champion_id}`)
    }

    // ------- Remove favorite from DB -------
    const removeFavorite = (event) => {
        dispatch({
            type: 'REMOVE_FAVORITE',
            payload: { params: { id: event.champion_id } }
        });
    }

    // ------- Getting favorite from champion DB using id -------
    let favChampion = champions[favorite.champion_id - 1];

    return (
        <Grid item sx={{ mx: '25px', my: '25px' }}>

            <Card variant="outlined" sx={{
                width: 250,
                height: 360,
                paddingLeft: '12px',
                paddingRight: '12px',
                boxShadow: 6,
                textAlign: 'center'
            }}>
                <CardContent>

                    {/* ------- Champion name, title ------- */}
                    <Typography variant="h6">
                        <b>{favChampion.name}</b>
                    </Typography>
                    <Typography>
                        <i>{favChampion.title}</i>
                    </Typography>

                    {/* ------- Details button ------- */}
                    <PortraitIcon 
                        onClick={() => toDetails(favorite)}
                        sx={{transform: 'scale(1.75)', cursor: 'pointer' }}
                    />

                    {/* ------- Notes icon ------- */}
                    <NotesButton
                        favorite={favorite}
                        name={favChampion.name}
                    />


                    {/* ------- Remove icon ------- */}
                    <ClearIcon 
                        onClick={() => removeFavorite(favorite)}
                        sx={{transform: 'scale(1.8)', cursor: 'pointer' }}
                    />
 

                    {/* ------- Matching champion image ------- */}
                    <CardMedia>
                        <img
                            src={favChampion.imageTile}
                            style={{
                                border: '1px solid black',
                                marginTop: '8px'
                            }}
                        />
                    </CardMedia>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default FavoriteItem;