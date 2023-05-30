import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import FavoriteButton from '../Buttons/FavoriteButton';
import NotesButton from '../Buttons/NotesButton'
import BlacklistButton from '../Buttons/BlacklistButton';
import RollButton from '../Buttons/RollButton';
import BackButton from '../Buttons/BackButton';

function ResultPage() {

    const dispatch = useDispatch();

    // ------- Fetch champions -------
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
    }, []);

    // ------- Storing result and champions -------
    const { result, champions } = useSelector(state => state);

    return (
        // ------- Prevent error when result is undefined -------
        result.champion === undefined
            ? <h2 className='container'>Please go back and roll again.</h2>
            :

            <div className="container">
                <center>
                    <h3>This game, Pix thinks you should play...</h3>

                    {/* ------- Pix image ------- */}
                    <img
                        src="images/pix-full.jpg"
                        style={{ width: '1300px' }}
                    />

                    {/* ------- Result name ------- */}
                    <h2>{result.champion.name}</h2>

                    {/* ------- Favorite button ------- */}
                    <FavoriteButton
                        result={result}
                    />  &nbsp;

                    {/* ------- Notes button ------- */}
                    <NotesButton
                        result={result}
                    />  &nbsp;

                    {/* ------- Blacklist button ------- */}
                    <BlacklistButton
                        result={result}
                    />

                    {/* ------- Result image ------- */}
                    <img src={result.champion.imageSplash} style={{ width: '1000px' }} />
                    <br /><br />

                    {/* ------- Back button ------- */}
                    <BackButton /> &nbsp;

                    {/* ------- Reroll button ------- */}
                    <RollButton
                        result={result}
                        champions={champions}
                    />
                </center>
            </div>
    );
}

export default ResultPage;