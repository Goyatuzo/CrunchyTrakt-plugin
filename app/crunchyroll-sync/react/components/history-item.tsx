import * as React from 'react';

interface IExternalProps {
    data: Crunchyroll.HistoryItem;
}

const HistoryItem: React.StatelessComponent<IExternalProps> = props => {
    return (
        <div className="item">
            <div className="image">
                <img className="image" src={props.data.media.screenshot_image.thumb_url}></img>
            </div>
            <div className="content">
                <a className="header">{props.data.media.name}</a>
                <div className="description">
                    Season {parseInt(props.data.collection.season) + 1}, Episode {props.data.media.episode_number}
                </div>
            </div>
        </div>
    )
}

export default HistoryItem;