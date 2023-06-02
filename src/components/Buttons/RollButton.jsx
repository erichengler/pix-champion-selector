import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// ------- MUI Imports -------
import { Button } from "@mui/material";

function RollButton({ favorites, championPool, result }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const champions = useSelector(store => store.champions)

    const roll = () => {
        // ------- Prevents rolling from empty championPool -------
        if (championPool != undefined) {
            if (championPool.length === 0) {
                alert('Cannot roll from an empty pool of champions!');
                return;
            }
        }

        console.log(favorites === undefined
            ? 'Rolling from filtered champions'
            : 'Rolling from favorites'
        );

        // ------- Picks a random result (number) -------
        // ------- from championPool or favorites -------  
        const random = Math.floor(Math.random()
            * (favorites === undefined
                ? championPool.length
                : favorites.length)
        );

        // ------- Sends result and reroll pool -------
        // ------- to result.reducer to be stored -------
        dispatch({
            type: 'SET_RESULT',
            payload: {
                champion: (favorites === undefined
                    ? championPool[random]
                    : champions[favorites[random].champion_id - 1]
                ),
                rerollPool: (favorites === undefined
                    ? championPool
                    : favorites
                )
            }
        });

        // ------- Brings user to result page -------
        history.push('/result');
    }

    // ------- Picks a random result (number) -------
    // ------- from championPool or favorites -------  
    const reroll = () => {
        const pool = result.rerollPool
        console.log(pool[0].name == undefined
            ? 'Rerolling from favorites'
            : 'Rerolling from filtered champions'
        );
        const random = Math.floor(Math.random() * pool.length);
        dispatch({
            type: 'SET_RESULT',
            payload: {
                champion: (pool[0].name == undefined
                    ? champions[pool[random].champion_id - 1]
                    : pool[random]),
                rerollPool: pool
            }
        });
    }

    return (
        <>
            <Button
                sx={{ boxShadow: 3, backgroundColor: '#a7a7cc' }}
                color="inherit"
                variant="outlined"
                onClick={result == undefined
                    ? roll
                    : reroll
                }
            >
                Roll
            </Button>
        </>
    );
}

export default RollButton;