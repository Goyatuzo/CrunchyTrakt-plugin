import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';
import { addTraktHistory } from '../../redux/actions';

interface ExternalProps {
    crunchyData: Crunchyroll.HistoryItem;
    traktData: Trakt.SearchResult;
}

interface StateToProps {
    alreadySynced: boolean;
    scrobbleData: Trakt.ScrobbleHistory;
}

interface DispatchToProps {
    // Remove later
    addToHistory: () => void;
}

type SyncEpisodeToggleProps = ExternalProps & StateToProps & DispatchToProps;

const SyncEpisodeToggleComp: React.StatelessComponent<SyncEpisodeToggleProps> = props => {
    function onClick(evt: React.MouseEvent<HTMLInputElement>) {
        props.addToHistory();
    }

    function labelText(): string {
        if (props.scrobbleData && props.traktData) {
            return 'Already Synced';
        } else {
            return 'Sync to Trakt';
        }
    }

    if (props.scrobbleData) {
        console.log(props.scrobbleData);
        console.log(props.crunchyData.timestamp);
        console.log(props.traktData !== undefined);
    }

    const syncedToTrakt = props.scrobbleData && props.traktData !== undefined;

    return (
        <div className='ui toggle checkbox'>
            <input onClick={onClick} type="checkbox" name="newsletter" defaultChecked={syncedToTrakt} disabled={(props.traktData === undefined) || syncedToTrakt} />
            <label>{labelText()}</label>
        </div>
    )
}

const SyncEpisodeToggle = connect<StateToProps, DispatchToProps, ExternalProps, CombinedState>((state, ext) => {
    const scrobbleList = state.trakt.historicScrobbles[ext.crunchyData.media.name];
    const comparisonDate = new Date(ext.crunchyData.timestamp).getTime();

    return {
        alreadySynced: scrobbleList !== undefined && scrobbleList.length > 0,
        scrobbleData: scrobbleList ? scrobbleList.filter(scrobble => new Date(scrobble.watched_at).getTime() === comparisonDate)[0] : null
    }
}, (dispatch, ext) => {
    return {
        addToHistory: () => dispatch(addTraktHistory(ext.crunchyData, ext.traktData) as any)
    }
})(SyncEpisodeToggleComp);

export default SyncEpisodeToggle;