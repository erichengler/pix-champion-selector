import { useHistory } from "react-router-dom";

function BackButton() {

    const history = useHistory();

    // ------- Brings user back to Champion List -------
    const back = () => {
        const previousPage = history.length > 2 ? history.goBack() : '/';
        history.push(previousPage);
    }

    return (
        <button onClick={back}>Back</button>
    );
}

export default BackButton;