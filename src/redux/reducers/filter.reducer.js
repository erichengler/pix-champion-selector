// ------- Initial state -------
const initialState = {
    class: '',
    region: '',
    minDifficulty: '1',
    maxDifficulty: '10',
    notes: ''
};

// ------- Updates or resets state of user filter -------
const filter = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            return {
                ...state,
                ...action.payload
            };
        case 'RESET_FILTER':
            return initialState;
        default:
            return state;
    }
};

export default filter;