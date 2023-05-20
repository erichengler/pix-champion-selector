// ------- Stores this note from server -------
const thisNote = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTE':
            return action.payload;
        default:
            return state;
    }
}

export default thisNote;