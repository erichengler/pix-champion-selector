import { useDispatch, useSelector } from "react-redux";

// ------- Material UI Imports -------
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './Buttons.css'

function FavoriteButton({ id, result }) {

    const dispatch = useDispatch();
    const favorites = useSelector(store => store.favorites);

    // ------- Checking if champion is on user's favorites -------
    const isFavorite = favorites.some(
        // ------- Matching by ID -------
        favorite => (id === undefined ?
            favorite.champion_id === result.champion.id :
            favorite.champion_id === Number(id)
        )
    );

    // ------- Adds champion to the user's favorites list -------
    const addFavorite = () => {
        dispatch({
            type: 'ADD_FAVORITE', payload: {
                id:
                    // ------- Using prop to check page -------
                    id === undefined ? result.champion.id : id
            }
        });
    }

    // ------- Remove champion from user's favorites list -------
    const removeFavorite = () => {
        dispatch({
            type: 'REMOVE_FAVORITE', payload: {
                params: {
                    id:
                        // ------- Using prop to check page -------
                        id === undefined ? result.champion.id : id
                }
            }
        });
    }

    return (
        <>
                {isFavorite
                    ? <FavoriteIcon
                            className="favorite-icon"
                            onClick={isFavorite
                                ? removeFavorite
                                : addFavorite}
                    />
                    : <FavoriteBorderIcon
                            className="favorite-icon"
                            onClick={isFavorite
                                ? removeFavorite
                                : addFavorite}
                    />
                }
        </>
    );
}

export default FavoriteButton;