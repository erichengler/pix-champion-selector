import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllChampions() {
    // get all champions from the DB
    try {
        const champions = yield axios.get('/api/champion');
        console.log('get all champions:', champions.data);
        yield put({ type: 'SET_CHAMPIONS', payload: champions.data });
    } catch {
        console.log('get all champions error');
    }
}

function* championSaga() {
    yield takeEvery('FETCH_CHAMPIONS', fetchAllChampions);
}

export default championSaga;