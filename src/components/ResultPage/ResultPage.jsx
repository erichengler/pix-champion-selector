import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import FavoriteButton from '../FavoriteButton/FavoriteButton';
import NotesButton from '../NotesButton/NotesButton'
import BlacklistButton from '../BlacklistButton/BlacklistButton';
import RollButton from '../RollButton/RollButton';

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
    const result = useSelector(store => store.result);
	const champions = useSelector(store => store.champions);

    // ------- Brings user back to UserPage -------
	const backToHome = () => {
		history.push('/');
	}

	return (
		<div className="container">
            <p>Pix thinks you should play...</p>

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
            <img src={result.champion.image} style={{width: '700px'}} />
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