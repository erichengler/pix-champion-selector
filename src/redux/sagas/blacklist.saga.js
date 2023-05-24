import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// ------- Get user's blacklist DB -------
function* fetchBlacklist() {
    try {
        const blacklist = yield axios.get(
            '/api/champion/blacklist');
        yield put({
            type: 'SET_BLACKLIST',
            payload: blacklist.data
        });
    } catch {
        console.log('Error in fetchBlacklist generator');
    }
}

// ------- Post champion to blacklist DB -------
function* addToBlacklist(action) {
    try {
        yield axios.post(
            '/api/champion/blacklist',
            action.payload
        );
        yield put({ type: 'FETCH_BLACKLIST' });
    } catch {
        console.log('Error in addToBlacklist generator');
    }
}

// ------- Remove champion from blacklist DB -------
function* removeFromBlacklist(action) {
    try {
        yield axios.delete(
            '/api/champion/blacklist',
            action.payload
        );
        yield put({ type: 'FETCH_BLACKLIST' });
    } catch {
        console.log('Error in removeFromBlacklist generator');
    }
}

function* blacklistSaga() {
    yield takeEvery('FETCH_BLACKLIST', fetchBlacklist);
    yield takeEvery('ADD_TO_BLACKLIST', addToBlacklist);
    yield takeEvery('REMOVE_FROM_BLACKLIST', removeFromBlacklist);
}

export default blacklistSaga;