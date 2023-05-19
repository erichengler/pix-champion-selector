import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import NotesModal from "../NotesModal/NotesModal";

function DetailsPage() {

    let { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    // ------- Fetch this champion, favorites and blacklist -------
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: id });
        dispatch({ type: 'FETCH_FAVORITES' });
        dispatch({ type: 'FETCH_BLACKLIST' })
    }, []);

    // ------- Storing this champion, favorites and blacklist -------
    const champion = useSelector(store => store.thisChampion);
    const favorites = useSelector(store => store.favorites);
    const blacklist = useSelector(store => store.blacklist);

    // ------- Checking if champion is on user's favorites -------
    const isFavorite = favorites.some(
        favorite => favorite.champion_id === champion[0].id);

    // ------- Checking if champion is on user's blacklist -------
    const isBlacklist = blacklist.some(
        blChampion => blChampion.champion_id === champion[0].id);

    // ------- Brings user back to Champion List -------
    const backToList = () => {
        history.push('/champions');
    }

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

    // ------- Adds champion to the user's blacklist -------
    const addToBlacklist = () => {
        dispatch({ type: 'ADD_TO_BLACKLIST', payload: { id: id } });
    }

    // ------- Remove champion from user's blacklist -------
    const removeFromBlacklist = () => {
            dispatch({
                type: 'REMOVE_FROM_BLACKLIST', payload: { params: { id: id } }
            });
    }

    return (
        <div>
            {/* ------- Checking reducer before loading ------- */}
            {champion.length === 0 ? (
                <h2>Loading...</h2>
            ) : (

                <div className="container">

                    {/* ------- Champion name ------- */}
                    <h2>{champion[0].name}</h2>

                    {/* ------- Champion title ------- */}
                    <span>{champion[0].title}</span>
                    <br /><br />

                    {/* ------- Favorite button ------- */}
                    <button onClick={
                        isFavorite ? removeFavorite : addFavorite
                    }>
                        {isFavorite ? 'Unfavorite' : 'Favorite'}
                    </button> &nbsp; &nbsp;

                    {/* ------- Notes button ------- */}
                    <NotesModal
                        champion={champion}
                        id={id}
                    /> &nbsp; &nbsp;

                    {/* ------- Blacklist button ------- */}
                    <button onClick={
                        isBlacklist ? removeFromBlacklist : addToBlacklist
                    }>
                        {isBlacklist ? 'Unblacklist' : 'Blacklist'}
                    </button> &nbsp; &nbsp;
                    <br />

                    {/* ------- Champion image ------- */}
                    <img
                        src={champion[0].image}
                        style={{ width: '500px', border: '1px solid black' }}
                    />
                    <br />

                    {/* ------- Class, difficulty and region ------- */}
                    <span>
                        Class: {champion[0].class} &nbsp; • &nbsp;
                        Difficulty: {champion[0].difficulty} &nbsp; • &nbsp;
                        Region: {champion[0].region}
                    </span>
                    <br /><br />

                    {/* ------- Champion lore ------- */}
                    <div
                        style={{ width: '500px' }}
                    >
                        {champion[0].lore}
                    </div>
                    <br /><br />

                    {/* ------- Back button ------- */}
                    <button onClick={backToList}>Back</button>
                </div>
            )}
        </div>
    );
}

export default DetailsPage;