// ------- Stores blacklist from server -------
const blacklist = (state = [], action) => {
    switch (action.type) {
        case 'SET_BLACKLIST':
            return action.payload;
        default:
            return state;
    }
}

export default blacklist;