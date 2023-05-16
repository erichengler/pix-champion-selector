import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

function DetailsPage() {

    let { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    // ------- GET this champion -------
    useEffect(() => {
        console.log(champion)
        dispatch({ type: 'FETCH_THIS_CHAMPION', payload: id });
    }, []);

    // ------- Storing current champion -------
    const champion = useSelector((store) => store.thisChampion);

    // ------- Brings user back to Champion List -------
    const backToList = () => {
        history.push('/champions');
    }

    const addFavorite = () => {
        dispatch({ type: 'ADD_FAVORITE', payload: {id} });
        alert(`${champion[0].name} has been added to your favorites.`);
    }

    return (
        <div>
            {/* ------- Checking reducer before loading ------- */}
            {champion.length === 0 ? (
                <h2>Loading...</h2>
            ) : (

                <div className="container">

                {/* ------- Champion Name ------- */}
                <h2>{champion[0].name}</h2>

                {/* ------- Champion Title ------- */}
                <span>{champion[0].title}</span>
                <br /><br />

                {/* ------- Favorite, Notes, Blacklist ------- */}
                <button onClick={addFavorite}>Favorite</button> &nbsp;
                <button>Notes</button> &nbsp;
                <button>Blacklist</button> &nbsp;
                <br />

                {/* ------- Champion Image ------- */}
                <img
                    src={champion[0].image}
                    style={{ width: '500px', border: '1px solid black' }}
                />
                <br />

                {/* ------- Class, Difficulty and Region ------- */}
                <span>
                    Class: {champion[0].class} &nbsp; • &nbsp;
                    Difficulty: {champion[0].difficulty} &nbsp; • &nbsp;
                    Region: {champion[0].region}
                </span>
                <br /><br />

                {/* ------- Champion Lore ------- */}
                <div
                    style={{ width: '500px' }}
                >
                    {champion[0].lore}
                </div>
                <br /><br />

                {/* ------- Back Button ------- */}
                <button onClick={backToList}>Back</button>
            </div>
            )}
        </div>
    );
}

export default DetailsPage;