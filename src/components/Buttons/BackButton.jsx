import { useHistory } from "react-router-dom";

// ------- MUI Imports -------
import { Button } from "@mui/material";

function BackButton() {

    const history = useHistory();

    // ------- Brings user back to previous page -------
    const back = () => {
        const previousPage = history.length > 2 ? history.goBack() : '/';
        history.push(previousPage);
    }

    return (
        // ------- Back button -------
        <Button 
            color='inherit'
            onClick={back}
            variant="outlined"
            sx={{ boxShadow: 3, backgroundColor: 'white' }}
        >
            Back
        </Button>
    );
}

export default BackButton;