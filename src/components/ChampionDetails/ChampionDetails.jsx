import { useHistory, useParams } from "react-router-dom";

function DetailsPage() {

    const history = useHistory();

    const backToList = () => {
        history.push('/champions')
    }

    return (
        <div className="container">
            <h2>Details</h2>

            {/* Back to Champion List Button */}
            <button onClick={backToList}>Back</button>
        </div>
    );
}

export default DetailsPage;