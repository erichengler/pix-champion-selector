import axios from 'axios';

// ------- Fetching champion names from championFull.json -------
async function fetchChampionNames() {

    // ! ------- Change this to your version ------- !
    const version = '12.6.1';

    try {
        const response = await axios.get(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/championFull.json`
        );
        return response.data.data;
    } catch (error) {
        console.log('Error in fetchChampionNames:', error);
    }
}

export default fetchChampionNames;