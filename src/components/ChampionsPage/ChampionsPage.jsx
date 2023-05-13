import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ChampionsPage() {

	// GET all champions from database
	useEffect(() => {
		dispatch({ type: 'FETCH_CHAMPIONS' });
	}, []);

	const dispatch = useDispatch();

	// Storing all champions
	const champions = useSelector(store => store.champions);

	return (
		<div className="container">
			<h2>Champion List</h2>

			{/* Maps through all champions */}
			{
				champions.map((champion) => (
					<img
						key={champion.id}
						src={champion.portrait}
						alt={champion.name}
						style={{ padding: '5px' }}
					/>
				))
			}
		</div>
	);
}

export default ChampionsPage;