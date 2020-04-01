import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';

interface ExternalProps {
    crunchyData: Crunchyroll.HistoryItem;
    syncable: boolean;
}

interface StateToProps {
    alreadySynced: boolean;
}

type SyncEpisodeToggleProps = ExternalProps

const SyncEpisodeToggleComp: React.StatelessComponent<SyncEpisodeToggleProps> = props => {
    return (
        <div className='ui toggle checkbox'>
            <input type="checkbox" name="newsletter" disabled={!props.syncable} />
            <label>Sync to Trakt</label>
        </div>
    )
}

const SyncEpisodeToggle = connect<StateToProps, {}, ExternalProps, CombinedState>((state, ext) => {
    return {
        alreadySynced: state.trakt.historicScrobbles[ext.crunchyData.timestamp] !== undefined
    }
})(SyncEpisodeToggleComp);

export default SyncEpisodeToggle;