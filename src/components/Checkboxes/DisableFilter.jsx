import { useDispatch } from 'react-redux';

function DisableFilter({ emptyFilter, checkboxToggle }) {

    const dispatch = useDispatch();

    // ------- Toggle state change for checkbox -------
    const toggleDisableFilter = () => {
        dispatch({ type: 'TOGGLE_DISABLE_FILTER' });
    }

    return (
        <>
            {/* ------- Disable filter checkbox ------- */}
            {emptyFilter
                ? ''
                : <label>
                    <input
                        type="checkbox"
                        checked={checkboxToggle.disableFilter}
                        onChange={toggleDisableFilter}
                    />
                    Disable filter
                </label>
            } 
        </>
    );
}

export default DisableFilter;