import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import FavoriteButton from "../FavoriteButton/FavoriteButton";
import NotesButton from "../NotesButton/NotesButton";
import BlacklistButton from "../BlacklistButton/BlacklistButton";

function DetailsPage() {

    let { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    // ------- Fetch this champion, favorites and blacklist -------
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: id });
    }, []);

    // ------- Storing this champion, favorites and blacklist -------
    const champion = useSelector(store => store.thisChampion);

    // ------- Brings user back to Champion List -------
    const backToList = () => {
        history.push('/champions');
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
                    <FavoriteButton 
                        id={id}
                    />

                    {/* ------- Notes button ------- */}
                    <NotesButton
                        champion={champion}
                        id={id}
                    /> &nbsp; &nbsp;

                    {/* ------- Blacklist button ------- */}
                    <BlacklistButton 
                        id={id}
                    />


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