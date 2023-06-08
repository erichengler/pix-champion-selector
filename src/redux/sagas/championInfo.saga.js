import { call, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

import fetchChampionNames from '../../data/fetchChampionNames';

// ------- Fetch champion info using names -------
function* fetchChampionInfo() {
    try {
        const response = yield call(axios.get, '/api/champion');
        const championsDatabase = response.data

        // ------- Checking for empty DB -------
        if (championsDatabase.length === 0) {
            // ------- Call fetchChampionNames -------
            const championNames = yield call(fetchChampionNames)
            // ------- Call fetchInfoByName for each name -------
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

function* fetchInfoByName(fetchedName) {
    try {
        // ------- Get champion info for each fetchedName -------
        const info = yield call(
            axios.get,
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${fetchedName}.json`
        );
        const championName = Object.keys(info.data.data)[0];
        // ------- Champion information -------
        const championInfo = info.data.data[championName]

        // ------- Links to champion images -------
        const imageSplash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fetchedName}_0.jpg`
        const imageTile = `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${fetchedName}_0.jpg`
        const imageSmall = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${fetchedName}.png`

        // ------- Keeping track of what champions we've processed -------
        if (processedChampions.includes(championName)) {
            return;
        }
        processedChampions.push(championName);

        // ------- Call postChampionInfo for each champion -------
        yield call(postChampionInfo, {
            info: championInfo, 
            images: {
                splash: imageSplash,
                tile: imageTile,
                small: imageSmall,
            }
        });
    } catch (error) {
        console.log('Error in fetchInfoByName generator:', error);
    }
}

// ------- Post champion information to database -------
function* postChampionInfo(data) {
    try {
        yield call(axios.post, '/api/champion', data);
    } catch (error) {
        console.error('Failed to post champion details:', error);
    }
}

function* championInfoSaga() {
    yield takeEvery('FETCH_CHAMPION_INFO', fetchChampionInfo);
}

export default championInfoSaga;