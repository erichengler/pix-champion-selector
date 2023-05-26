import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// ------- Get user's notes from DB -------
function* fetchNotes() {
    try {
        const notes = yield axios.get('/api/note');
        yield put({
            type: 'SET_NOTES',
            payload: notes.data
        });
    } catch {
        console.log('Error in fetchNotes generator');
    }
}

// ------- Post note to notes DB -------
function* addNote(action) {
    try {
        console.log(action)
        yield axios.post('/api/note', action.payload);
        yield put({ type: 'FETCH_NOTES' });
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in addNote generator');
    }
}

// ------- Remove note from notes DB -------
function* removeNote(action) {
    try {
        yield axios.delete(`/api/note/${action.payload}`);
        yield put({ type: 'FETCH_NOTES' });
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in removeNote generator');
    }
}

// ------- Edit note in notes DB -------
function* editNote(action) {
    try {
        yield axios.put('/api/note', action.payload);
        yield put({ type: 'FETCH_NOTES' });
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in editNote generator');
    }
}

function* noteSaga() {
    yield takeEvery('FETCH_NOTES', fetchNotes);
    yield takeEvery('ADD_NOTE', addNote);
    yield takeEvery('REMOVE_NOTE', removeNote);
    yield takeEvery('EDIT_NOTE', editNote);
}

export default noteSaga;