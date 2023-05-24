import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// ------- Get all notes from notes DB -------
function* fetchNotes() {
    try {
        const notes = yield axios.get('/api/champion/notes');
        // console.log('Get notes:', notes.data);
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
        yield axios.post('/api/champion/notes', action.payload);
        yield put({ type: 'FETCH_NOTES' });
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in addNote generator');
    }
}

// ------- Remove note from notes DB -------
function* removeNote(action) {
    try {
        yield axios.delete(`/api/champion/notes/${action.payload}`);
        yield put({ type: 'FETCH_NOTES' });
        yield put({ type: 'FETCH_FAVORITES' });
    } catch {
        console.log('Error in removeNote generator');
    }
}

// ------- Edit note in notes DB -------
function* editNote(action) {
    try {
        yield axios.put('/api/champion/notes', action.payload);
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