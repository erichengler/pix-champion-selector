// ------- Initial state -------
const initialState = {
    class: '',
    region: '',
    minDifficulty: '1',
    maxDifficulty: '10',
    notes: ''
};

// ------- Stores state of checkboxes -------
const filter = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload;
        default:
            return state;
    }
}

export default filter;