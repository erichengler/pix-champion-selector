import { useState } from 'react';
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

function NotesButton({ champion, favorite, name, result }) {

    const dispatch = useDispatch();

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
        return (result === undefined ?
            (favorite === undefined ? champion[0].name : name) :
            result.champion.name
        );
    }

    // ------- Get ID required based on current page -------
    const foundId = (result != undefined ? result.champion.id :
        (
            favorite === undefined ?
                champion[0].id :
                favorite.champion_id
        )
    );

    // ------- Check if a note exists, then -------
    // ------- set to defaultValue of textfield -------
    const defaultNote = () => {
        return (favorite === undefined ?
            (thisNote.length === 0 ? '' : thisNote[0].note) :
            (favorite.note === undefined ? '' : favorite.note)
        );
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
        dispatch({
            type: 'ADD_NOTE',
            payload: { id: foundId, note: note }
        });
        handleClose();
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
        dispatch({
            type: 'EDIT_NOTE',
            payload: { id: foundId, note: note }
        });
        handleClose();
    }

    // ------- Deletes notes for the champion -------
    const deleteNotes = () => {
        dispatch({
            type: 'REMOVE_NOTE',
            payload: foundId
        });
        handleClose();
    }

    return (
        <>
            {/* ------- Add note or Edit note button ------- */}
            <button onClick={handleOpen}>
                {favorite === undefined ? 
                    // ------- Checking if a note exists -------
                    (thisNote.length === 0 ? 'Add Note' : 'Edit Note') :
                    (favorite.note == undefined ? 'Add Note' : 'Edit Note')
                }
            </button>

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
                                onClick={thisNote.length === 0 ?
                                    handleClose : deleteNotes}>
                                {thisNote.length === 0 ? 'Cancel' : 'Delete'}
                            </button>

                            {/* ------- Submit or Save button ------- */}
                            <button
                                onClick={thisNote.length === 0 ?
                                    createNotes : updateNotes}>
                                {thisNote.length === 0 ? 'Submit' : 'Save'}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* ------- Cancel or Delete button ------- */}
                            <button
                                onClick={favorite.note == undefined ?
                                    handleClose : deleteNotes}>
                                {favorite.note == undefined ? 'Cancel' : 'Delete'}
                            </button>

                            {/* ------- Submit or Save button ------- */}
                            <button
                                onClick={favorite.note == undefined ?
                                    createNotes : updateNotes}>
                                {favorite.note == undefined ? 'Submit' : 'Save'}
                            </button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    )
}
export default NotesButton;