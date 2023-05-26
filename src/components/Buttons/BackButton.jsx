import { useHistory } from "react-router-dom";

function BackButton() {

    const history = useHistory();

    // ------- Brings user back to previous page -------
    const back = () => {
        const previousPage = history.length > 2 ? history.goBack() : '/';
        history.push(previousPage);
    }

    return (
        // ------- Back button -------
        <button onClick={back}>Back</button>
    );
}

export default BackButton;