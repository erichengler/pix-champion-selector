import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function FavoritesPage() {

    // Storing champions, favorites
    const champions = useSelector(store => store.champions);
    const favorites = useSelector(store => store.favorites);

    const dispatch = useDispatch();

    // Fetch favorites on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    return (
        <div>
            {/* ------- Checking reducer before loading ------- */}
            {champions.length === 0 || favorites.length === 0 ? (
                <h2>Loading...</h2>
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