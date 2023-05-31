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

    // ------- Fetch this champion and favorites -------
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: id });
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    // ------- Storing this champion -------
    const champion = useSelector(store => store.thisChampion);

    return (
        <div>
            {/* ------- Checking reducer before loading ------- */}
            {champion.length === 0 ? (
                <h2>Loading...</h2>
            ) : (
                <center>
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
                        style={{ 
                            width: '800px', 
                            paddingBottom: '7px',
                            paddingTop: '7px'
                        }}
                    />
                    <br />

                    {/* ------- Class, difficulty and region ------- */}
                    <span>
                        {/* This turns "{Enchanter,Warden}" into "Enchanter, Warden" */}
                        Class: {champion[0].class.slice(1, -1)
                            .split(',').map(classItem => classItem
                            .trim()).join(', ')} &nbsp; • &nbsp;
                        Difficulty: {champion[0].difficulty} &nbsp; • &nbsp;
                        Region: {champion[0].region}
                    </span>
                    <br /><br />

                    {/* ------- Champion lore ------- */}
                    <div
                        style={{ width: '700px' }}
                    >
                        {champion[0].lore}
                    </div>
                    <br /><br />

                    {/* ------- Back button ------- */}
                    <BackButton />
                </div>
                </center>
            )}
        </div>
    );
}

export default DetailsPage;