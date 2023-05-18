import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function RollButton({ favorites, champions, result }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const roll = () => {
        const random = Math.floor(Math.random()
            * (favorites === undefined ? champions.length : favorites.length))
        dispatch({
            type: 'SET_RESULT',
            payload: (favorites === undefined ? champions[random]
                : champions[favorites[random].champion_id - 1])
        });
        history.push('/result');
    }

    const reroll = () => {
        // TODO: Find a way to figure out which page you came from
        // create a pool with either favorites or champions
        // based on which page you came from - reroll from that pool
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