// ------- Initial state -------
const initialState = {
    includeBlacklist: false,
    disableFilter: false,
};

// ------- Stores state of checkboxes -------
const checkboxToggle = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_INCLUDE_BLACKLIST':
            return {
                ...state,
                includeBlacklist: !state.includeBlacklist
            };
        case 'TOGGLE_DISABLE_FILTER':
            return {
                ...state,
                disableFilter: !state.disableFilter
            };
        case 'RESET_FILTER':
            return {
                ...state,
                disableFilter: false
            }
        default:
            return state;
    }
}

export default checkboxToggle;