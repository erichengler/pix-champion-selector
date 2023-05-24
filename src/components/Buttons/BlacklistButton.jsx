import { useDispatch, useSelector } from "react-redux";

function BlacklistButton({ id, result }) {

    const dispatch = useDispatch();
    const blacklist = useSelector(store => store.blacklist);

    // ------- Checking if champion is on user's blacklist -------
    const isBlacklist = blacklist.some(
        // ------- Matching by ID -------
        blChampion => (id === undefined ?
            blChampion.champion_id === result.champion.id :
            blChampion.champion_id === Number(id)
        )
    );

    // ------- Adds champion to the user's blacklist -------
    const addToBlacklist = () => {
        dispatch({
            type: 'ADD_TO_BLACKLIST', payload: {
                id:
                    id === undefined ? result.champion.id : id
            }
        });
    }

    // ------- Remove champion from user's blacklist -------
    const removeFromBlacklist = () => {
        dispatch({
            type: 'REMOVE_FROM_BLACKLIST', payload: {
                params: {
                    id:
                        id === undefined ? result.champion.id : id
                }
            }
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
    );
}

export default BlacklistButton;