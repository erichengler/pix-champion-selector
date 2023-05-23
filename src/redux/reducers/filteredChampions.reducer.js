// ------- Stores filtered champions -------
const filteredChampions = (state = [], action) => {
    switch (action.type) {
        case 'SET_FILTERED_CHAMPIONS':
            return action.payload;
        default:
            return state;
    }
}

export default filteredChampions;