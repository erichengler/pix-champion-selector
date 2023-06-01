import { useDispatch, useSelector } from "react-redux";

// ------- Material UI imports -------
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

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
                    // ------- Using prop to check page -------
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
                        // ------- Using prop to check page -------
                        id === undefined ? result.champion.id : id
                }
            }
        });
    }

    return (
        <>
            {/* ------- Add to / remove from blacklist button ------- */}
                {isBlacklist
                    ? <NoAccountsIcon
                            className="blacklist-icon"
                            onClick={isBlacklist
                                ? removeFromBlacklist
                                : addToBlacklist
                            }
                    />
                    : <NoAccountsOutlinedIcon
                            className="blacklist-icon"
                            onClick={isBlacklist
                                ? removeFromBlacklist
                                : addToBlacklist
                            }
                    />
                }
        </>
    );
}

export default BlacklistButton;