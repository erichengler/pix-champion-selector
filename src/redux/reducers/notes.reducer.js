// ------- Stores all user's notes from server -------
const Notes = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        default:
            return state;
    }
}

export default Notes;