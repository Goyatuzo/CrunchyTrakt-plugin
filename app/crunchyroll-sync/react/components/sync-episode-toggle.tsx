import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';
import { addTraktHistory } from '../../redux/actions';

interface ExternalProps {
    crunchyData: Crunchyroll.HistoryItem;
    syncable: boolean;

    // Remove later
    traktData: Trakt.SearchResult;
}

interface StateToProps {
    alreadySynced: boolean;
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

    return (
        <div className='ui toggle checkbox'>
            <input onClick={onClick} type="checkbox" name="newsletter" disabled={!props.syncable} />
            <label>Sync to Trakt</label>
        </div>
    )
}

const SyncEpisodeToggle = connect<StateToProps, DispatchToProps, ExternalProps, CombinedState>((state, ext) => {
    return {
        alreadySynced: state.trakt.historicScrobbles[ext.crunchyData.timestamp] !== undefined
    }
}, (dispatch, ext) => {
    return {
        addToHistory: () => dispatch(addTraktHistory(ext.crunchyData, ext.traktData) as any)
    }
})(SyncEpisodeToggleComp);

export default SyncEpisodeToggle;