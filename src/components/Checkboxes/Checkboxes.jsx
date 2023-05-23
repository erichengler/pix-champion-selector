import { useDispatch } from 'react-redux';

function Checkboxes({ filteredChampions, blacklist, checkboxToggle }) {

    const dispatch = useDispatch();

    // ------- Toggle state change for checkboxes -------
    const toggleDisableFilter = () => {
        dispatch({ type: 'TOGGLE_DISABLE_FILTER' });
    }
    const toggleIncludeBlacklist = () => {
        dispatch({ type: 'TOGGLE_INCLUDE_BLACKLIST' });
    }

    return (
        <>
            {/* ------- Disable filter checkbox ------- */}
            {filteredChampions.length === 0
                ? ''
                : <label>
                    <input
                        type="checkbox"
                        checked={checkboxToggle.disableFilter}
                        onChange={toggleDisableFilter}
                    />
                    Disable filter
                </label>
            } &nbsp;

            {/* ------- Include blacklist checkbox ------- */}
            {blacklist.length === 0
                ? ''
                : <label>
                    <input
                        type="checkbox"
                        checked={checkboxToggle.includeBlacklist}
                        onChange={toggleIncludeBlacklist}
                    />
                    Include blacklisted
                </label>
            }
            <br />
        </>
    );
}

export default Checkboxes