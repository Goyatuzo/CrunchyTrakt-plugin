import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';
import { searchTraktFor } from '../../redux/actions';

interface ExternalProps {
    data: Crunchyroll.HistoryItem;
}

interface StateToProps {
    traktData: Trakt.SearchResult;
}

interface DispatchToProps {
    requestTrakt: (type: Trakt.SearchType[]) => void;
}

type HistoryItemProps = ExternalProps & StateToProps & DispatchToProps;

const HistoryItemComp: React.StatelessComponent<HistoryItemProps> = props => {
    if (props.data.media && !props.traktData) {
        props.requestTrakt(['episode'])
    }

    return (
        <div className="item">
            <div className="image">
                <img className="image" src={props.data.media.screenshot_image.thumb_url}></img>
            </div>
            <div className="content">
                <h3 className="header">{props.data.media.name}</h3>
                <div className="description">
                    Season {parseInt(props.data.collection.season)}, Episode {props.data.media.episode_number}
                </div>
            </div>

            <div className="content">
                <a className="header">{props.traktData?.episode?.title}</a>
            </div>
        </div>
    )
}

const HistoryItem = connect<StateToProps, DispatchToProps, ExternalProps, CombinedState>((state, ext) => {
    return {
        traktData: state.trakt.results[ext.data.media.name]
    }
}, (dispatch, ext) => {
    return {
        requestTrakt: (type: Trakt.SearchType[]) => dispatch(searchTraktFor(type, ext.data) as any)
    }
})(HistoryItemComp);

export default HistoryItem;