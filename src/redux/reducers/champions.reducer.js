// ------- Stores all champions from server -------
const champions = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHAMPIONS':
            return action.payload;
        default:
            return state;
    }
}

export default champions;