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
    function onClick(evt: React.ChangeEvent<HTMLInputElement>) {
        if (evt.currentTarget.checked)
            props.addToHistory();
    }

    function labelText(): string {
        if (props.scrobbleData && props.traktData) {
            return 'Already Synced';
        } else if (props.traktData && !props.scrobbleData) {
            return 'Sync to Trakt';
        }

        return 'Cannot be synced';
    }

    const syncedToTrakt = props.scrobbleData && props.traktData !== undefined;

    return (
        <label className="checkbox">
            <input onChange={onClick} type="checkbox" name="newsletter" defaultChecked={syncedToTrakt} disabled={(props.traktData === undefined) || syncedToTrakt} />
            {labelText()}
        </label>
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