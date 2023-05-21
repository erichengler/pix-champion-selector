import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RollButton({ favorites, filteredChampions, result }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const champions = useSelector(store => store.champions)

    // ------- Picks a random result from either -------
    // ------- filtered filteredChampions or favorites -------
    const roll = () => {
        console.log(favorites === undefined ?
            'Rolling from filtered champions' : 'Rolling from favorites');
        const random = Math.floor(Math.random()
            * (favorites === undefined
                ? filteredChampions.length
                : favorites.length)
        );
        dispatch({
            type: 'SET_RESULT',
            payload: {
                champion: (favorites === undefined 
                    ? filteredChampions[random]
                    : champions[favorites[random].champion_id - 1]
                ),
                rerollPool: (favorites === undefined 
                    ? filteredChampions 
                    : favorites
                )
            }
        });
        history.push('/result');
    }

    // ------- Picks a random result from either -------
    // ------- filtered champions or favorites -------
    const reroll = () => {
        const pool = result.rerollPool
        console.log(pool[0].name == undefined ?
            'Rerolling from favorites' : 'Rerolling from filtered champions');
        const random = Math.floor(Math.random() * pool.length);
        dispatch({
            type: 'SET_RESULT',
            payload: {
                champion: (pool[0].name == undefined 
                    ? champions[pool[random].champion_id - 1] 
                    : pool[random]),
                rerollPool: pool
            }
        });
    }

    return (
        <>
            <button
                onClick={result == undefined ? roll : reroll}>
                {result == undefined ? 'Roll' : 'Reroll'}
            </button>
        </>
    )
}

export default RollButton;