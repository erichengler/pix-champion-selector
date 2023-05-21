import { useHistory } from 'react-router-dom';
import './ChampionItem.css';

function ChampionItem({ champion }) {

    const history = useHistory();

    // ------- Brings user to champion details -------
    const toDetails = () => {
        history.push(`/details/${champion.id}`)
    }

    return (
        <div className="champion-avatar">
            {/* ------- Champion portraits ------- */}
            <img
                key={champion.id}
                src={champion.portrait}
                alt={champion.name}
                style={{ padding: '5px', cursor: 'pointer' }}
                onClick={toDetails}             
            />
            <span className="champion-name">{champion.name}</span>
        </div>
    );
}

export default ChampionItem;