import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// ------- Get all champions from the DB -------
function* fetchAllChampions() {
    try {
        const champions = yield axios.get('/api/champion');
        // console.log('Get champions:', champions.data);
        yield put({ type: 'SET_CHAMPIONS', payload: champions.data });
    } catch {
        console.log('Error in fetchAllChampions generator');
    }
}

// ------- Get this champion from the DB -------
function* fetchThisChampion(action) {
    try {
        // ------- Based on ID -------
        const champion = yield axios.get(`/api/champion/details?id=${action.payload}`);
        // console.log(`Get this champion with ID: ${action.payload}`);
        yield put({ type: 'SET_CHAMPION', payload: champion.data });
    } catch {
        console.log('Error in fetchThisChampion generator');
    }
}

// ------- Get user's favorites from the DB -------
function* fetchFavorites() {
    try {
        const favorites = yield axios.get('/api/champion/favorites');
        // console.log('Get favorites:', favorites.data);
        yield put({ type: 'SET_FAVORITES', payload: favorites.data });
    } catch {
        console.log('Error in fetchFavorites generator');
    }
}

// ------- Post champion to favorites DB -------
function* addFavorite (action) {
    try {
        yield axios.post('/api/champion/favorites', action.payload);
    } catch {
        console.log('Error in addFavorite generator');
    }
}

// ------- Remove champion from favorites DB -------
function* removeFavorite (action) {
    try {
        yield axios.delete('/api/champion/favorites', action.payload);
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in removeFavorite generator');
    }
}

// ------- Get a note from the DB -------
function* fetchNote (action) {
    try {
        // ------- Based on ID -------
        const note = yield axios.get(`/api/champion/notes?id=${action.payload}`);
        // console.log(`Get this note with champion ID: ${action.payload}`);
        yield put({ type: 'SET_NOTE', payload: note.data });
    } catch {
        console.log('Error in fetchNote generator');
    }
}

// ------- Post note to notes DB -------
function* addNote (action) {
    try {
        yield axios.post('/api/champion/notes', action.payload);
    } catch {
        console.log('Error in addNote generator');
    }
}

function* championSaga() {
    yield takeEvery('FETCH_CHAMPIONS', fetchAllChampions);
    yield takeEvery('FETCH_THIS_CHAMPION', fetchThisChampion);
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('ADD_FAVORITE', addFavorite);
    yield takeEvery('REMOVE_FAVORITE', removeFavorite);
    yield takeEvery('FETCH_THIS_NOTE', fetchNote);
    yield takeEvery('ADD_NOTE', addNote);

}

export default championSaga;