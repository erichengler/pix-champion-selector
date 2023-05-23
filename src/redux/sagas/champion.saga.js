import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// ------- Get all champions from champions DB -------
function* fetchChampions() {
    try {
        const champions = yield axios.get('/api/champion');
        // console.log('Get champions:', champions.data);
        yield put({
            type: 'SET_CHAMPIONS',
            payload: champions.data
        });
    } catch {
        console.log('Error in fetchChampions generator');
    }
}

// ------- Get this champion from champions DB -------
function* fetchThisChampion(action) {
    try {
        // ------- Based on ID -------
        const champion = yield axios.get(
            `/api/champion/details?id=${action.payload}`
        );
        // console.log(`Get this champion with ID: ${action.payload}`);
        yield put({
            type: 'SET_CHAMPION',
            payload: champion.data
        });
    } catch {
        console.log('Error in fetchThisChampion generator');
    }
}

function* championSaga() {
    yield takeEvery('FETCH_CHAMPIONS', fetchChampions);
    yield takeEvery('FETCH_THIS_CHAMPION', fetchThisChampion);
}

export default championSaga;