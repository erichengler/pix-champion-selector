// ------- Stores filtered champions from server -------
const filteredChampions = (state = [], action) => {
    switch (action.type) {
        case 'SET_FILTERED_CHAMPIONS':
            return action.payload;
        default:
            return state;
    }
}

export default filteredChampions;