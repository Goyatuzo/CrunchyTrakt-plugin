import * as React from 'react';

interface ExternalProps {
    crunchyData: Crunchyroll.HistoryItem;
    syncable: boolean;
}

type SyncEpisodeToggleProps = ExternalProps

const SyncEpisodeToggle: React.StatelessComponent<SyncEpisodeToggleProps> = props => {
    return (
        <div className='ui toggle checkbox'>
            <input type="checkbox" name="newsletter" disabled={!props.syncable}/>
            <label>Sync to Trakt</label>
        </div>
    )
}

export default SyncEpisodeToggle;