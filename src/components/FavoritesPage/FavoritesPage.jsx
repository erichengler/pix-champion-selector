import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function FavoritesPage() {

    // Storing champions, favorites
    const champions = useSelector(store => store.champions);
    const favorites = useSelector(store => store.favorites);
    // ! IDEA: CHANGE GET REQUEST QUERYTEXT FOR FAVORITES TO A JOIN THAT 
    // ! ALSO GETS CHAMPION INFORMATION FROM CHAMPIONS TABLE
            
    const dispatch = useDispatch();

    // Fetch favorites on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    const removeFavorite = (event) => {
        if (confirm(
            `Are you sure you want to remove ${champions[event.champion_id - 1].name} from your favorites?`
        )) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { params: { id: event.id } } });
        }
    }

    return (
        <div>
            {/* ------- Checking reducer ------- */}
            {favorites.length === 0 ? (
                <div className="container">
                    <h2>No favorites...</h2>
                </div>
            ) : (

                <div className="container">
                    <h2>Favorites</h2>

                    {/* ------- Mapping through favorites and ------- */}
                    {/* ------- matching by champion_id ------- */}
                    {
                        favorites.map(favorite => {
                            return <div key={favorite.id}>

                                {/* ------- Matching champion name ------- */}
                                {champions[favorite.champion_id - 1].name}

                                {/* Notes and remove buttons */}
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <button>Notes</button>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <button onClick={() => removeFavorite(favorite)}>Remove</button>
                                <br />

                                {/* ------- Matching champion image ------- */}
                                <img
                                    src={champions[favorite.champion_id - 1].image}
                                    style={{ width: '400px' }}
                                />
                                <br /><br /><br />
                            </div>
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;