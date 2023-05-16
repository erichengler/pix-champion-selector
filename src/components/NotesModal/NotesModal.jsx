import { useState } from 'react';

// ------- MaterialUI Imports -------
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { fontSize } from '@mui/system';

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

function NotesModal({ champion }) {

    // Storing modal status
    const [open, setOpen] = useState(false);

    // HandleChange for modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Saves user's notes to the DB
    const saveNotes = (event) => {
        // TODO: Dispatch to ADD_NOTES goes here
    }

    return (
        <>
            <button onClick={handleOpen}>Notes</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Notes for {champion[0].name}
                    </Typography>
                    <textarea rows={8} cols={40}></textarea>
                    <br />
                    <button onClick={(event) => saveNotes(event)}>Save</button>
                </Box>
            </Modal>
        </>
    );
}

export default NotesModal;