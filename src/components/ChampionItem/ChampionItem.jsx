import { useHistory } from 'react-router-dom';

function ChampionItem({ champion }) {

    const history = useHistory();

    // ------- Brings user to champion details -------
    const toDetails = () => {
        history.push(`/details/${champion.id}`)
    }

    return (
        <>
            {/* ------- Champion portraits ------- */}
            <img
                key={champion.id}
                src={champion.portrait}
                alt={champion.name}
                style={{ padding: '5px', cursor: 'pointer' }}
                onClick={toDetails}             
            />
        </>
    );
}

export default ChampionItem;