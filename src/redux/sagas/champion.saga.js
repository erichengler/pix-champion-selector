import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import filteredChampions from '../reducers/filteredChampions.reducer';

function* fetchAllChampions() {
    // Get all champions from the DB
    try {
        const champions = yield axios.get('/api/champion');
        console.log('Get champions:', champions.data);
        yield put({ type: 'SET_CHAMPIONS', payload: champions.data });
    } catch {
        console.log('Error in fetchAllChampions generator');
    }
}

function* fetchThisChampion(action) {
    // Get this champion from the DB
    try {
        const champion = yield axios.get(`/api/champion/details?id=${action.payload}`);
        console.log(`Get this champion with ID: ${action.payload}`);
        yield put({ type: 'SET_CHAMPION', payload: champion.data });
    } catch {
        console.log('Error in fetchThisChampion generator');
    }
}

function* fetchFavorites() {
    // Get user's favorites from the DB
    try {
        const favorites = yield axios.get('/api/champion/favorites');
        console.log('Get favorites:', favorites.data);
        yield put({ type: 'SET_FAVORITES', payload: favorites.data });
    } catch {
        console.log('Error in fetchFavorites generator');
    }
}

function* addFavorite (action) {
    // Post champion to favorites DB
    try {
        yield axios.post('/api/champion/favorites', action.payload);
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in addFavorite generator');
    }
}

function* removeFavorite (action) {
    // Remove champion from favorites DB
    try {
        yield axios.delete('/api/champion/favorites', action.payload);
        yield put({ type: 'FETCH_FAVORITES' });
    } catch (error) {
        console.log('Error in removeFavorite generator', error);
    }
}

function* championSaga() {
    yield takeEvery('FETCH_CHAMPIONS', fetchAllChampions);
    yield takeEvery('FETCH_THIS_CHAMPION', fetchThisChampion);
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('ADD_FAVORITE', addFavorite);
    yield takeEvery('REMOVE_FAVORITE', removeFavorite);
}

export default championSaga;