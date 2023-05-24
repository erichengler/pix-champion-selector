import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import FavoriteButton from '../Buttons/FavoriteButton';
import NotesButton from '../Buttons/NotesButton'
import BlacklistButton from '../Buttons/BlacklistButton';
import RollButton from '../Buttons/RollButton';

function ResultPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    // ------- Fetch champions, this champion, -------
    // ------- blacklist and favorites -------
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
    }, []);

    // ------- Storing result, champions, this -------
    // ------- champion, blacklist, and favorites -------
    const { result, champions } = useSelector(state => state);

    // ------- Brings user back to UserPage -------
    const backToHome = () => {
        history.push('/');
    }

    return (
        <div className="container">
            <p>This game, Pix thinks you should play...</p>
            <img
                src="images/pix-small.png"
                style={{ width: '300px' }}
            />

            {/* Random result name */}
            <h2>{result.champion.name}</h2>

            <FavoriteButton
                result={result}
            />  &nbsp;

            <NotesButton
                result={result}
            />  &nbsp;

            <BlacklistButton
                result={result}
            />

            {/* Random result image */}
            <img src={result.champion.image} style={{ width: '700px' }} />
            <br /><br />

            {/* Back to Home Button */}
            <button onClick={backToHome}>Back</button>
            &nbsp; &nbsp;

            {/* Reroll Button */}
            <RollButton
                result={result}
                champions={champions}
            />
        </div>
    );
}

export default ResultPage;