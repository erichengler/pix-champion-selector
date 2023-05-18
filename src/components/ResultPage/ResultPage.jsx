import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import RollButton from '../RollButton/RollButton';

function ResultPage() {

    const history = useHistory();

    // ------- Storing result, champions, favorites -------
    const result = useSelector(store => store.result);
	const champions = useSelector(store => store.champions);
    const favorites = useSelector(store => store.favorites);

    // Brings user back to Home (UserPage)
	const backToHome = () => {
		history.push('/');
	}

	return (
		<div className="container">
            <p>Pix thinks you should play...</p>

            {/* Random result name */}
            <h2>{result.champion.name}</h2>

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
                favorites={favorites}
            />
		</div>
	);
}

export default ResultPage;