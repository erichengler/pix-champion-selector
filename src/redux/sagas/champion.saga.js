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

// ------- Get all filtered champions from champions DB -------
function* fetchFilteredChampions() {
    try {
        const filteredChampions = yield axios.get('/api/champion');
        // console.log('Get champions:', champions.data);
        yield put({
            type: 'SET_FILTERED_CHAMPIONS',
            payload: filteredChampions.data
        });
    } catch {
        console.log('Error in fetchFilteredChampions generator');
    }
}

// ------- Get user's favorites DB -------
function* fetchFavorites() {
    try {
        const favorites = yield axios.get(
            '/api/champion/favorites'
        );
        // console.log('Get favorites:', favorites.data);
        yield put({
            type: 'SET_FAVORITES',
            payload: favorites.data
        });
    } catch {
        console.log('Error in fetchFavorites generator');
    }
}

// ------- Post champion to favorites DB -------
function* addFavorite(action) {
    try {
        yield axios.post(
            '/api/champion/favorites',
            action.payload);
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in addFavorite generator');
    }
}

// ------- Remove champion from favorites DB -------
function* removeFavorite(action) {
    try {
        yield axios.delete(
            '/api/champion/favorites',
            action.payload);
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in removeFavorite generator');
    }
}

// ------- Get this note from notes DB -------
function* fetchThisNote(action) {
    try {
        // ------- Based on ID -------
        const note = yield axios.get(
            `/api/champion/thisnote?id=${action.payload}`);
        // console.log(`Get this note with champion ID: ${action.payload}`);
        yield put({ type: 'SET_NOTE', payload: note.data });
    } catch {
        console.log('Error in fetchThisNote generator');
    }
}

// ------- Post note to notes DB -------
function* addNote(action) {
    try {
        yield axios.post('/api/champion/notes', action.payload);
    } catch {
        console.log('Error in addNote generator');
    }
}

// ------- Remove note from notes DB -------
function* removeNote(action) {
    try {
        yield axios.delete(`/api/champion/notes/${action.payload}`);
    } catch {
        console.log('Error in removeNote generator');
    }
}

// ------- Edit note in notes DB -------
function* editNote(action) {
    try {
        yield axios.put('/api/champion/notes', action.payload);
    } catch {
        console.log('Error in editNote generator');
    }
}


// ------- Get user's blacklist DB -------
function* fetchBlacklist() {
    try {
        const blacklist = yield axios.get(
            '/api/champion/blacklist');
        console.log('Get blacklist:', blacklist.data);
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

function* championSaga() {
    yield takeEvery('FETCH_CHAMPIONS', fetchChampions);
    yield takeEvery('FETCH_THIS_CHAMPION', fetchThisChampion);
    yield takeEvery('FETCH_FILTERED_CHAMPIONS', fetchFilteredChampions)
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('ADD_FAVORITE', addFavorite);
    yield takeEvery('REMOVE_FAVORITE', removeFavorite);
    yield takeEvery('FETCH_THIS_NOTE', fetchThisNote);
    yield takeEvery('ADD_NOTE', addNote);
    yield takeEvery('REMOVE_NOTE', removeNote);
    yield takeEvery('EDIT_NOTE', editNote);
    yield takeEvery('FETCH_BLACKLIST', fetchBlacklist);
    yield takeEvery('ADD_TO_BLACKLIST', addToBlacklist);
    yield takeEvery('REMOVE_FROM_BLACKLIST', removeFromBlacklist);
}

export default championSaga;