import { useHistory } from 'react-router-dom';
import './ChampionItem.css';

function ChampionItem({ champion }) {

    const history = useHistory();

    // ------- Brings user to champion details -------
    const toDetails = () => {
        history.push(`/champions/${champion.id}`)
    }

    return (
        <div className="champion-avatar">
            {/* ------- Champion portrait ------- */}
            <img
                key={champion.id}
                src={champion.imageSmall}
                alt={champion.name}
                style={{ padding: '9px', cursor: 'pointer' }}
                onClick={toDetails}             
            />
            <span className="champion-name">{champion.name}</span>
        </div>
    );
}

export default ChampionItem;