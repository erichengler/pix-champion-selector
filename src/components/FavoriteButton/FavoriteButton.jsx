import { useDispatch } from "react-redux";

function FavoriteButton({ champion, favorites, id }) {

    // ! Get champion_id from result reducer to get "id" on results page
    // ! then do ternary operator

    const dispatch = useDispatch();

    // ------- Adds champion to the user's favorites list -------
    const addFavorite = () => {
        dispatch({ type: 'ADD_FAVORITE', payload: { id: id } });
    }

    // ------- Remove champion from user's favorites list -------
    const removeFavorite = () => {
        dispatch({
            type: 'REMOVE_FAVORITE', payload: { params: { id: id } }
        });
    }

    // ------- Checking if champion is on user's favorites -------
    const isFavorite = favorites.some(
        favorite => favorite.champion_id === champion[0].id);

    return (
        <>
            <button onClick={
                isFavorite ? removeFavorite : addFavorite
            }>
                {isFavorite ? 'Unfavorite' : 'Favorite'}
            </button> &nbsp; &nbsp;
        </>
    )
}

export default FavoriteButton;