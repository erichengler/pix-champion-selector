// ------- Initial state of checkboxes -------
const initialState = {
    includeBlacklist: false,
    disableFilter: false,
};

// ------- Stores state of checkboxes -------
const checkboxes = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export default checkboxes;