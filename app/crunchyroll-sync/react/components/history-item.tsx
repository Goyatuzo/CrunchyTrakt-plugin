import * as React from 'react';

interface IExternalProps {
    data: Crunchyroll.HistoryItem;
}

const HistoryItem: React.StatelessComponent<IExternalProps> = props => {
    return (
        <div className="card">
            <div className="row">
                <div className="col col-md-6">
                    <h3 className="card-title">{props.data.media.name}</h3>
                    <img src={props.data.media.screenshot_image.thumb_url}></img>
                    <p>Season {props.data.collection.season}, Episode {props.data.media.episode_number}</p>
                </div>

                <div className="col col-md-6">
                    <h3 className="card-title">{props.data.media.name}</h3>
                    <img src={props.data.media.screenshot_image.thumb_url}></img>
                    <p>Season {props.data.collection.season}, Episode {props.data.media.episode_number}</p>
                </div>
            </div>
        </div>
    )
}

export default HistoryItem;