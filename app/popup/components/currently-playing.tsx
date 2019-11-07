import * as React from 'react';

import AppStateContext from '../contexts/app-state';

export class CurrentlyPlaying extends React.Component<unknown, {}> {
    static contextType = AppStateContext;
    context!: React.ContextType<typeof AppStateContext>;

    render() {
        if (this.context.beingPlayed) {
            return (
                <div className="panel">
                    <p>{this.context.beingPlayed.seriesName}</p>
                    <p>Season {this.context.beingPlayed.seasonNumber} EP {this.context.beingPlayed.episodeNumber}</p>
                    <p>{this.context.beingPlayed.episodeTitle}</p>
                </div>
            )
        }

        return null;
    }
}
export default CurrentlyPlaying;