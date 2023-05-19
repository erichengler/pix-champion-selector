import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import RollButton from '../RollButton/RollButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

function ResultPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    // ------- Fetch champions, this champion, -------
    // ------- blacklist and favorites -------
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: result.champion.id });
		dispatch({ type: 'FETCH_BLACKLIST' });
	}, []);

    // ------- Storing result, champions, this -------
    // ------- champion, blacklist, and favorites -------
    const result = useSelector(store => store.result);
	const champions = useSelector(store => store.champions);
    const champion = useSelector(store => store.thisChampion);
    const blacklist = useSelector(store => store.blacklist);

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