// Used to store randomized champion result
const result = (state = [], action) => {
    switch (action.type) {
        case 'SET_RESULT':
            return action.payload;
        default:
            return state;
    }
}

export default result;