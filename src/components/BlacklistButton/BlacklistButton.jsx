import { useDispatch } from "react-redux";

function BlacklistButton({ champion, blacklist, id }) {

    // ! Get champion_id from result reducer to get "id" on results page
    // ! then do ternary operator

    const dispatch = useDispatch();

    // ------- Checking if champion is on user's blacklist -------
    const isBlacklist = blacklist.some(
        blChampion => blChampion.champion_id === champion[0].id);

    // ------- Adds champion to the user's blacklist -------
    const addToBlacklist = () => {
        dispatch({ type: 'ADD_TO_BLACKLIST', payload: { id: id } });
    }

    // ------- Remove champion from user's blacklist -------
    const removeFromBlacklist = () => {
        dispatch({
            type: 'REMOVE_FROM_BLACKLIST', payload: { params: { id: id } }
        });
    }

    return (
        <>
            <button onClick={
                isBlacklist ? removeFromBlacklist : addToBlacklist
            }>
                {isBlacklist ? 'Unblacklist' : 'Blacklist'}
            </button> &nbsp; &nbsp;
            <br />
        </>
    )
}

export default BlacklistButton;