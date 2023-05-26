import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// ------- Get user's favorites from DB -------
function* fetchFavorites() {
    try {
        const favorites = yield axios.get(
            '/api/champion/favorites'
        );
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

function* favoriteSaga() {
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('ADD_FAVORITE', addFavorite);
    yield takeEvery('REMOVE_FAVORITE', removeFavorite);
}

export default favoriteSaga;