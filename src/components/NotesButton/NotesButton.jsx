import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ------- MaterialUI Imports -------
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// ------- Modal styling -------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 10,
    p: 4,
};

function NotesModal({ champion, favorite, name, id }) {

    const dispatch = useDispatch();

    // ------- Fetch this note based on id -------
    // ------- if on champion details page
    if (favorite === undefined) {
        useEffect(() => {
            dispatch({ type: 'FETCH_THIS_NOTE', payload: id });
        }, []);
    }

    // ------- Storing this note -------
    const thisNote = useSelector(store => store.thisNote);

    // ------- Storing modal status -------
    const [open, setOpen] = useState(false);

    // ------- HandleChange for modal -------
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // ------- Checks which prop was sent -------
    // ------- then returns champion's name -------
    const notesHeader = () => {
        return (favorite === undefined ? champion[0].name : name )
    }

    // ------- Check if a note exists, then -------
    // ------- set to defaultValue of textfield -------
    

    const defaultNote = () => {
        if (favorite === undefined) {
            return (thisNote.length === 0 ? '' : thisNote[0].note)
        } else if (champion === undefined) {
            return (favorite.note === undefined ? '' : favorite.note)
        }
    }

    // ------- Creates notes for the champion -------
    const createNotes = (event) => {
        // ------- Grabs note from modal textfield -------
        let note = event.target.parentElement.children[1].value;
        // ------- Prevents creating an empty note -------
        if (note === '') {
            alert('Cannot create empty note.')
            return;
        }
        // ------- Checking what page we're on -------
        if (favorite === undefined) {
            dispatch({
                type: 'ADD_NOTE',
                payload: { id: champion[0].id, note: note }
            });
        } else if (champion === undefined) {
            dispatch({
                type: 'ADD_NOTE',
                payload: { id: favorite.champion_id, note: note }
            });
        }
        location.reload();
    }

    // ------- Updates notes for the champion -------
    const updateNotes = (event) => {
        // ------- Grabs note from modal textfield -------
        let note = event.target.parentElement.children[1].value;
        // ------- Prevents updating to an empty note -------
        if (note === '') {
            alert('Cannot update to an empty note.')
            return;
        }
        // ------- Checking what page we're on -------
        if (favorite === undefined) {
            dispatch({
                type: 'EDIT_NOTE',
                payload: { id: champion[0].id, note: note }
            });
        } else if (champion === undefined) {
            dispatch({
                type: 'EDIT_NOTE',
                payload: { id: favorite.champion_id, note: note }
            });
        }
        location.reload();
    }

    // ------- Deletes notes for the champion -------
    const deleteNotes = () => {
        // ------- Checking what page we're on -------
        if (favorite === undefined) {
            dispatch({
                type: 'REMOVE_NOTE',
                payload: champion[0].id
            });
        } else if (champion === undefined) {
            dispatch({
                type: 'REMOVE_NOTE',
                payload: favorite.champion_id
            });
        }
        location.reload();
    }

    return (
        <>
            {/* ------- Checking what page we're on ------- */}
            {favorite === undefined ? (
                // ------- Add note or Edit note button -------
                <button onClick={handleOpen}>
                    {/* ------- Checking if a note exists ------- */}
                    {thisNote.length === 0 ? 'Add Note' : 'Edit Note'}
                </button>
            ) : (
                // ------- Add note or Edit note button -------
                <button onClick={handleOpen}>
                    {/* ------- Checking if a note exists ------- */}
                    {favorite.note == undefined ? 'Add Note' : 'Edit Note'}
                </button>
            )}

            {/* ------- Modal ------- */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {/* ------- Modal header ------- */}
                    <Typography variant="h6">
                        Notes for {notesHeader()}
                    </Typography>

                    {/* ------- Modal textfield ------- */}
                    <textarea rows={10} cols={35}
                        defaultValue={defaultNote()}
                        style={{
                            border: '1px solid black',
                            fontSize: '16px',
                            maxWidth: '500px',
                            maxHeight: '280px'
                        }}
                    >
                    </textarea>
                    <br />

                    {/* ------- Checking what page we're on ------- */}
                    {favorite === undefined ? (
                        <>
                            {/* ------- Cancel or Delete button ------- */}
                            <button
                                onClick={thisNote.length === 0 ? handleClose : deleteNotes}>
                                {thisNote.length === 0 ? 'Cancel' : 'Delete'}
                            </button>

                            {/* ------- Submit or Save button ------- */}
                            <button
                                onClick={thisNote.length === 0 ? createNotes : updateNotes}>
                                {thisNote.length === 0 ? 'Submit' : 'Save'}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* ------- Cancel or Delete button ------- */}
                            <button
                                onClick={favorite.note == undefined ? handleClose : deleteNotes}>
                                {favorite.note == undefined ? 'Cancel' : 'Delete'}
                            </button>

                            {/* ------- Submit or Save button ------- */}
                            <button
                                onClick={favorite.note == undefined ? createNotes : updateNotes}>
                                {favorite.note == undefined ? 'Submit' : 'Save'}
                            </button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    )
}
export default NotesModal;