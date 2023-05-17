// Used to store notes for champions
const thisNote = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTE':
            return action.payload;
        default:
            return state;
    }
}

export default thisNote;