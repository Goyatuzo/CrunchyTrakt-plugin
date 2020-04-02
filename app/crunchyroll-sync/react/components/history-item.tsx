import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';
import { searchTraktFor } from '../../redux/actions';
import SyncEpisodeToggle from './sync-episode-toggle';

interface ExternalProps {
    data: Crunchyroll.HistoryItem;
}

interface StateToProps {
    traktData: Trakt.SearchResult;
    isRequestingTrakt: boolean;
}

interface DispatchToProps {
    requestTrakt: (type: Trakt.SearchType[]) => void;
}

type HistoryItemProps = ExternalProps & StateToProps & DispatchToProps;

const HistoryItemComp: React.StatelessComponent<HistoryItemProps> = props => {
    if (props.data.media && !props.traktData) {
        props.requestTrakt(['episode'])
    }

    let TraktComponent: JSX.Element = null

    // If the trakt request returns data 
    if (!props.isRequestingTrakt && props.traktData) {
        TraktComponent = <>
            <h3 className="header">{props.traktData?.episode.title}</h3>
            <div className="description">
                Season {props.traktData?.episode.season}, Episode {props.traktData?.episode.number}
            </div>
        </>
        // We are still waiting for a response
    } else if (props.isRequestingTrakt) {
        TraktComponent = <div className="ui active centered inline loader"></div>;
        // Couldn't find the data in Trakt.
    } else if (!props.isRequestingTrakt && !props.traktData) {
        TraktComponent = <>
            <h3 className="header">Could not find the Episode in Trakt</h3>
        </>
    }

    return (
        <article className="media">
            <figure className="image">
                <img src={props.data.media.screenshot_image.thumb_url} />
            </figure>
            <div className="content">
                <h3 className="header">{props.data.media.name}</h3>
                <div className="description">
                    Season {parseInt(props.data.collection.season)}, Episode {props.data.media.episode_number}
                </div>

                {TraktComponent}
            </div>

            <div className="content">
                <SyncEpisodeToggle crunchyData={props.data} traktData={props.traktData} />
            </div>
        </article>
    )
}

const HistoryItem = connect<StateToProps, DispatchToProps, ExternalProps, CombinedState>((state, ext) => {
    return {
        traktData: state.trakt.results[ext.data.media.name],
        isRequestingTrakt: state.trakt.isRequesting[ext.data.media.name],
    }
}, (dispatch, ext) => {
    return {
        requestTrakt: (type: Trakt.SearchType[]) => dispatch(searchTraktFor(type, ext.data) as any)
    }
})(HistoryItemComp);

export default HistoryItem;