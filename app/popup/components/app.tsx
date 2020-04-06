import * as React from 'react';

import AppStateContext, { IAppStateContext } from '../contexts/app-state';
import TraktApi from '../../trakt/trakt-api';
import Login from './login'
import CurrentlyPlaying from './currently-playing';
import { AppMessageType, IAppMessage } from '../../classes/app-message';
import { browser } from 'webextension-polyfill-ts';
import { IVideoData } from '../../classes/video-info';
import SyncRedirect from './sync-redirect';

export class App extends React.Component<unknown, IAppStateContext> {
    constructor(props: any) {
        super(props);

        this.state = {
            loggedIn: false,
            logout: () => {
                TraktApi.revokeToken();
                this.setState({ loggedIn: false })
            },
            login: () => {
                TraktApi.authorize()
                this.setState({ loggedIn: true })
            },
            beingPlayed: null
        };
    };

    componentDidMount() {
        TraktApi.userLoggedIn().then(isLoggedIn => {
            this.setState({
                loggedIn: isLoggedIn
            });
        });
    }

    render() {
        return (
            <AppStateContext.Provider value={this.state}>
                <section className="section">
                    <div className="container">
                        <SyncRedirect />
                    </div>
                </section>
            </AppStateContext.Provider >
        )
    }
}

export default App;