import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllChampions() {
    // get all champions from the DB
    try {
        const champions = yield axios.get('/api/champion');
        console.log('get champions:', champions.data);
        yield put({ type: 'SET_CHAMPIONS', payload: champions.data });
    } catch {
        console.log('Get champions error');
    }
}

function* fetchThisChampion(action) {
    // get this champion from the DB
    try {
        const champion = yield axios.get(`/api/champion/details?id=${action.payload}`);
        console.log(`Get this champion with ID: ${action.payload}`);
        yield put({ type: 'SET_CHAMPION', payload: champion.data });
    } catch {
        console.log('Get this champion error');
    }
}

function* championSaga() {
    yield takeEvery('FETCH_CHAMPIONS', fetchAllChampions);
    yield takeEvery('FETCH_THIS_CHAMPION', fetchThisChampion);
}

export default championSaga;