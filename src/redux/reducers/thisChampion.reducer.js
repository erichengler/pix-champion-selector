// Used to store a specific champion returned from the server
const thisChampion = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHAMPION':
            return action.payload;
        default:
            return state;
    }
}

export default thisChampion;