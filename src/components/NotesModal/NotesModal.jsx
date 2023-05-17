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

function NotesModal({ champion, favChampion, id }) {

    const dispatch = useDispatch();

    // ------- Fetch this note -------
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_NOTE', payload: id });
    }, []);

    // ------- Storing note -------
    const thisNote = useSelector(store => store.thisNote);

    // ------- Storing modal status -------
    const [open, setOpen] = useState(false);

    // ------- HandleChange for modal -------
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // ------- Saves user's notes to the DB -------
    const saveNotes = (event) => {
        // TODO: Dispatch to ADD_NOTES goes here
        handleClose();
    }

    // ------- Checks which prop was sent -------
    // ------- then returns champion's name -------
    const notesHeader = () => {
        if (favChampion === undefined) {
            return champion[0].name;
        } else if (champion === undefined) {
            return favChampion.name;
        }
    }

    // ------- Check if a note exists, then -------
    // ------- set to defaultValue of textfield -------
    const defaultNote = () => {
        if (thisNote.length === 0) {
            return '';
        } else {
            return thisNote[0].note
        }
    }

    return (
        <div>
            {/* ------- Checking reducer before loading ------- */}
            {thisNote.length === 0 ? (
                // ------- Add Note button, opens Modal -------
                <button onClick={handleOpen}>Add Note</button>
            ) : (
                // ------- Edit Note button, opens Modal -------
                <button onClick={handleOpen}>Edit Note</button>
            )}

            <>
                {/* ------- Modal ------- */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        {/* ------- Modal header ------- */}
                        <Typography id="modal-modal-title" variant="h6" component="h2">
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

                        {/* ------- Modal save button ------- */}
                        <button onClick={(event) => saveNotes(event)}>Save</button>
                    </Box>
                </Modal>
            </>
        </div>
    )
}
export default NotesModal;