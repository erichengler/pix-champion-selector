// ------- Stores a champion from server -------
const thisChampion = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHAMPION':
            return action.payload;
        default:
            return state;
    }
}

export default thisChampion;