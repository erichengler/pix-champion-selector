import { useDispatch } from 'react-redux';

function IncludeBlacklist({ blacklist, checkboxToggle }) {

    const dispatch = useDispatch();

    // ------- Toggle state change for checkbox -------
    const toggleIncludeBlacklist = () => {
        dispatch({ type: 'TOGGLE_INCLUDE_BLACKLIST' });
    }

    return (
        <>
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
        </>
    );
}

export default IncludeBlacklist;