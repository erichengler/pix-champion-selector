import { call, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

import fetchChampionNames from '../../data/fetchChampionNames';

// ------- Fetch champion info -------
function* fetchChampionInfo() {
    try {
        const response = yield call(axios.get, '/api/champion');
        const championsDatabase = response.data

        if (championsDatabase.length === 0) {
            const championNames = yield call(fetchChampionNames)
            yield all(
                Object.keys(championNames).map((name) =>
                    call(fetchInfoByName, name)
                )
            );
        }
    } catch (error) {
        console.error('Error in fetchChampionInfo generator:', error);
    }
}

// ! ------- Change this to your version ------- !
const version = '12.6.1';
const processedChampions = [];

function* fetchInfoByName(fetchedname) {
    try {
        const response = yield call(
            axios.get,
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${fetchedname}.json`
        );
        const championName = Object.keys(response.data.data)[0];
        const champion = response.data.data[championName]

        if (processedChampions.includes(championName)) {
            return;
        }

        processedChampions.push(championName);

        yield call(postChampionInfo, champion);
    } catch (error) {
        console.log('Error in fetchInfoByName generator:', error);
    }
}

function* postChampionInfo(info) {
    try {
        yield call(axios.post, '/api/champion', info);
    } catch (error) {
        console.error('Failed to post champion details:', error);
    }
}

function* championInfoSaga() {
    yield takeEvery('FETCH_CHAMPION_INFO', fetchChampionInfo);
}

export default championInfoSaga;