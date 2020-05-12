import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';
import { addTraktHistory } from '../../redux/actions';
import { RequestState } from '../../../classes/request-state';

interface ExternalProps {
    crunchyData: Crunchyroll.HistoryItem;
    traktData: Trakt.SearchResult;
}

interface StateToProps {
    alreadySynced: boolean;
    scrobbleData: Trakt.ScrobbleHistory;
    syncState: RequestState;
    searchRequestState: RequestState
}

interface DispatchToProps {
    // Remove later
    addToHistory: () => void;
}

type SyncEpisodeToggleProps = ExternalProps & StateToProps & DispatchToProps;

const SyncEpisodeToggleComp: React.StatelessComponent<SyncEpisodeToggleProps> = props => {
    function addToHistory(_: React.MouseEvent<HTMLButtonElement>) {
        props.addToHistory();
    }

    // Searching
    if (props.searchRequestState === RequestState.AWAITING) {
        return <button type="button" className='button is-info' disabled={true}>Searching Trakt...</button>
    }
    // Already synced
    if ((props.scrobbleData && props.traktData) || props.syncState === RequestState.SUCCESS) {
        return <button type="button" disabled={true} className='button is-light is-success'>Already Synced</button>
    }
    // Can be synced to Trakt
    else if (props.traktData && !props.scrobbleData) {
        return <button type="button" onClick={addToHistory} className='button is-info'>Sync to Trakt</button>
        // Not enough data to sync to trakt
    } else if (props.searchRequestState === RequestState.NO_RESULTS) {
        return <button type="button" disabled={true} className='button is-warning'>Could not find in Trakt</button>
    } else {
        return <button type="button" disabled={true} className='button is-warning'>Not Enough Data</button>
    }
}

const SyncEpisodeToggle = connect<StateToProps, DispatchToProps, ExternalProps, CombinedState>((state, ext) => {
    const scrobbleList = state.trakt.historicScrobbles[ext.crunchyData.media.media_id];
    const comparisonDate = new Date(ext.crunchyData.timestamp).getTime();

    return {
        alreadySynced: scrobbleList !== undefined && scrobbleList.length > 0,
        scrobbleData: scrobbleList ? scrobbleList.filter(scrobble => new Date(scrobble.watched_at).getTime() === comparisonDate)[0] : null,
        syncState: state.trakt.historyAddState[`${ext.crunchyData.media.media_id}${ext.crunchyData.timestamp}`],
        searchRequestState: state.trakt.isRequesting[ext.crunchyData.media.media_id]
    }
}, (dispatch, ext) => {
    return {
        addToHistory: () => dispatch(addTraktHistory(ext.crunchyData, ext.traktData) as any)
    }
})(SyncEpisodeToggleComp);

export default SyncEpisodeToggle;