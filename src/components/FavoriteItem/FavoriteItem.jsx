import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NotesButton from '../NotesButton/NotesButton';

function FavoriteItem({ favorite, champions }) {

    const history = useHistory();
    const dispatch = useDispatch();

    // ------- Brings user to champion details -------
    const toDetails = (event) => {
        history.push(`/details/${event.champion_id}`)
    }

    // ------- Remove favorite from DB -------
    const removeFavorite = (event) => {
        dispatch({
            type: 'REMOVE_FAVORITE',
            payload: { params: { id: event.champion_id } }
        });
    }

    let favChampion = champions[favorite.champion_id - 1];

    return (
        <div>
            {/* ------- Champion name, title ------- */}
            <b>{favChampion.name}</b>, <i>{favChampion.title}</i>
            <br />

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
                src={favChampion.image}
                style={{ width: '400px' }}
            />
            <br /><br /><br />
        </div>
    );
}

export default FavoriteItem;