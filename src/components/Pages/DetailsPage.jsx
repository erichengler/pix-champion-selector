import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import FavoriteButton from "../Buttons/FavoriteButton";
import NotesButton from "../Buttons/NotesButton";
import BlacklistButton from "../Buttons/BlacklistButton";
import BackButton from "../Buttons/BackButton";

function DetailsPage() {

    let { id } = useParams();
    const dispatch = useDispatch();

    // ------- Fetch this champion, favorites and blacklist -------
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: id });
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    // ------- Storing this champion, favorites and blacklist -------
    const champion = useSelector(store => store.thisChampion);

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
                    /> &nbsp; &nbsp;

                    {/* ------- Notes button ------- */}
                    <NotesButton
                        champion={champion}
                    /> &nbsp; &nbsp;

                    {/* ------- Blacklist button ------- */}
                    <BlacklistButton 
                        id={id}
                    />


                    {/* ------- Champion image ------- */}
                    <img
                        src={champion[0].imageSplash}
                        style={{ width: '800px', border: '1px solid black' }}
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
                    <BackButton />
                </div>
            )}
        </div>
    );
}

export default DetailsPage;