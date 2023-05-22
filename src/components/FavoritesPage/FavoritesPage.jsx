import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import FavoriteItem from '../FavoriteItem/FavoriteItem';
import RollButton from '../RollButton/RollButton';

function FavoritesPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    // ------- Fetch champions and favorites -------
    useEffect(() => {
        dispatch({ type: 'FETCH_CHAMPIONS' });
        dispatch({ type: 'FETCH_FAVORITES' });
    }, []);

    // Storing champions, favorites
    const champions = useSelector(store => store.champions);
    const favorites = useSelector(store => store.favorites);

    // ------- Brings user back to Home -------
    const backToHome = () => {
        history.push('/');
    }

    return (
        <div>
            {/* ------- Checking champions reducer ------- */}
            {champions.length === 0 ? (
                <div className="container">
                    <h2>Loading...</h2>
                </div>
            ) : (

                // ------- Checking favorites reducer -------
                favorites.length === 0 ? (
                    <div className="container">
                        <h2>No Favorites</h2>
                    </div>
                ) : (

                    <div className="container">
                        <h2>Favorites</h2>

                        {/* ------- Mapping through favorites and ------- */}
                        {/* ------- matching by champion_id ------- */}
                        {
                            favorites.map((favorite) => (
                                <FavoriteItem 
                                    key={favorite.id}
                                    champions={champions}
                                    favorite={favorite}
                                />
                            ))
                        }
                        {/* ------- Back to home button ------- */}
                        <button onClick={backToHome}>Back</button>
                        &nbsp; &nbsp;

                        {/* ------- Roll button ------- */}
                        <RollButton
                            champions={champions}
                            favorites={favorites}
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default FavoritesPage;