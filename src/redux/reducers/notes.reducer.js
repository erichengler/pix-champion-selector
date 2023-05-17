// Used to store all notes
const notes = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        default:
            return state;
    }
}

export default notes;