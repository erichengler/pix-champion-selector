import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function RollButton({ favorites, champions, result }) {

    const dispatch = useDispatch();
    const history = useHistory();

    // ------- Picks a random result from either -------
    // ------- filtered champions or favorites -------
    const roll = () => {
        console.log(favorites === undefined
            ? 'Rolling from filtered champions'
            : 'Rolling from favorites')
        const random = Math.floor(Math.random()
            * (favorites === undefined ? champions.length : favorites.length));
        dispatch({
            type: 'SET_RESULT',
            payload: {
                champion: (favorites === undefined ? champions[random]
                    : champions[favorites[random].champion_id - 1]),
                rerollPool: (favorites === undefined ? champions : favorites)
            }
        });
        history.push('/result');
    }

    // ------- Picks a random result from either -------
    // ------- filtered champions or favorites -------
    const reroll = () => {
        console.log(result.rerollPool[0].name == undefined
            ? 'Rerolling from favorites'
            : 'Rerolling from filtered champions');
        const random = Math.floor(Math.random() * result.rerollPool.length);
        dispatch({
            type: 'SET_RESULT',
            payload: {
                champion: (result.rerollPool[0].name == undefined
                    ? champions[result.rerollPool[random].champion_id - 1]
                    : result.rerollPool[random]),
                rerollPool: result.rerollPool
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