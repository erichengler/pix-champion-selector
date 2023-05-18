import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import NotesModal from "../NotesModal/NotesModal";

function DetailsPage() {

    let { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    // ------- Fetch this champion -------
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: id });
    }, []);

    // ------- Storing this champion -------
    const champion = useSelector(store => store.thisChampion);

    // ------- Brings user back to Champion List -------
    const backToList = () => {
        history.push('/champions');
    }

    // ------- Adds a champion to the favorites list -------
    const addFavorite = () => {
        dispatch({ type: 'ADD_FAVORITE', payload: { id: id } });
        alert(`${champion[0].name} has been added to your favorites.`);
    }

    // ------- Remove favorite from DB -------
    const removeFavorite = () => {
        if (confirm(
            `Are you sure you want to remove ${champion[0].name} from your favorites?`
        )) {
            dispatch({type: 'REMOVE_FAVORITE', payload: { params: { id: id } }
            });
        }
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
                    <button onClick={addFavorite}>Favorite</button> &nbsp; &nbsp;

                    {/* ------- Notes button ------- */}
                    <NotesModal
                        champion={champion}
                        id={id}
                    /> &nbsp; &nbsp;

                    {/* ------- Blacklist button ------- */}
                    <button>Blacklist</button> &nbsp; &nbsp;
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