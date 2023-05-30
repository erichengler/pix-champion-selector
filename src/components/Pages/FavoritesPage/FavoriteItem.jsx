import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NotesButton from '../../Buttons/NotesButton';

// ------- MUI Imports -------
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
        <Grid item sx={{ mx: '25px', my: '30px' }}>

            <Card variant="outlined" sx={{
                width: 250,
                height: 300,
                padding: '20px',
                paddingBottom: '52px',
                boxShadow: 6,
                textAlign: 'center'
            }}>
            {/* ------- Champion name, title ------- */}
            <b>{favChampion.name}</b>
            <br />
            <i>{favChampion.title}</i>
            <br /><br />

            {/* ------- Details button ------- */}
            <button
                onClick={() => toDetails(favorite)}
            >
                Details
            </button>
            &nbsp; &nbsp;

            {/* ------- Notes button ------- */}
            <NotesButton
                favorite={favorite}
                name={favChampion.name}
            />
            &nbsp; &nbsp;

            {/* ------- Remove button ------- */}
            <button
                onClick={() => removeFavorite(favorite)}
            >
                Remove
            </button>
            <br />

            {/* ------- Matching champion image ------- */}
            <img
                src={favChampion.imageTile}
                style={{ width: '250px' }}
            />
            </Card>
        </Grid>
    );
}

export default FavoriteItem;