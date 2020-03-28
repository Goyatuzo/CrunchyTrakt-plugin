import * as React from 'react';

interface IExternalProps {
    data: Crunchyroll.HistoryItem;
}

const HistoryItem: React.StatelessComponent<IExternalProps> = props => {
    return (
        <div className="card">
            <h3 className="card-title">{props.data.media.name}</h3>
            <img src={props.data.media.screenshot_image.thumb_url}></img>
            <p>Season {props.data.collection.season}, Episode {props.data.media.episode_number}</p>
            <p>{props.data.collection.complete.toString()}</p>
        </div>
    )
}

export default HistoryItem;