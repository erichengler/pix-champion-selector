import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ResultPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    // Storing randomized champion result
    const result = useSelector(store => store.result);
    // Storing all champions
	const champions = useSelector(store => store.champions);

    // Brings user back to Home (UserPage)
	const backToHome = () => {
		history.push('/');
	}

    // Roll again - get another random champion
    const reroll = () => {
		const random = Math.floor(Math.random() * champions.length);
		console.log(champions[random]);
		dispatch({ type: 'SET_RESULT', payload: champions[random] });
    }

	return (
		<div className="container">
            <p>Pix thinks you should play...</p>

            {/* Random result name */}
            <h2>{result.name}</h2>

            {/* Random result image */}
            <img src={result.image} style={{width: '700px'}} />
            <br /><br />

            {/* Back to Home Button */}
            <button onClick={backToHome}>Back</button>
            &nbsp; &nbsp;

            {/* Reroll Button */}
            <button onClick={reroll}>Reroll</button>
		</div>
	);
}

export default ResultPage;