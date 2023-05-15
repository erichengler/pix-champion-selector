import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import filteredChampions from '../reducers/filteredChampions.reducer';

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

function* fetchFilteredChampions() {
    // get filtered champions from the DB
    try {
        const filteredList = yield axios.get('/api/champion/filteredList');
        console.log('get filtered champions:', filteredList.data);
        yield put({ type:'SET_FILTERED_CHAMPIONS', payload: filteredList.data });
    } catch {
        console.log('Get filtered list error');
    }
}

function* championSaga() {
    yield takeEvery('FETCH_CHAMPIONS', fetchAllChampions);
    yield takeEvery('FETCH_THIS_CHAMPION', fetchThisChampion);
    yield takeEvery('FETCH_FILTERED_CHAMPIONS', fetchFilteredChampions)
}

export default championSaga;