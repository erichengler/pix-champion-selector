import { useHistory } from 'react-router-dom';

function ChampionItem({ champion }) {

    const history = useHistory();

    // Brings user to details of the champion that was clicked on
    const toDetails = () => {
        history.push(`/details/${champion.id}`)
    }

    return (
        <>
            {/* Champion Portraits */}
            <img
                key={champion.id}
                src={champion.portrait}
                alt={champion.name}
                style={{ padding: '5px' }}
                onClick={toDetails}
            />
        </>
    );
}

export default ChampionItem;