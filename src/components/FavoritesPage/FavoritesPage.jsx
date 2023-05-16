import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

function FavoritesPage() {

    // Storing champions, favorites
    const champions = useSelector(store => store.champions);
    const [favoriteIds, setFavoriteIds] = useState([]);

    const dispatch = useDispatch();

    // Fetch favorites on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
        fetchFavoriteIds();
    }, []);

    // Get user's favorites from server
    const fetchFavoriteIds = () => {
        axios.get('/api/champion/favorites')
            .then(response => {
                setFavoriteIds(response.data);
                console.log('favorites:', response.data);
            })
            .catch(error => {
                console.log('Error in fetchFavorites', error);
                alert('Something went wrong');
            })
    }

    return (
        <div>
            {/* ------- Checking reducer before loading ------- */}
            {champions.length === 0 ? (
                <h2>Loading...</h2>
            ) : (

                <div className="container">
                    <h2>Favorites</h2>

                    {/* ------- Map through favoriteIds and ------- */}
                    {/* ------- Display champions with matching Ids ------- */}
                    {
                        favoriteIds.map(favorite => {
                            return <div>{champions[(favorite.champion_id - 1)].name}
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <button>Notes</button>
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <button>Remove</button>
                                <br />
                                <img
                                    src={champions[(favorite.champion_id - 1)].image}
                                    style={{ width: '400px' }}
                                />
                                <br /><br />
                            </div>
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;