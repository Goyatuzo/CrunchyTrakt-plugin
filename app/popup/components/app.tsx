import * as React from 'react';

import AppStateContext, { IAppStateContext } from '../contexts/app-state';
import TraktApi from '../../trakt/trakt-api';

export class App extends React.Component {
    private appState: IAppStateContext = {
        loggedIn: false
    };

    componentDidMount() {
        TraktApi.userLoggedIn().then(isLoggedIn => {
            // this.appState = { ...this.appState, loggedIn: isLoggedIn };
        })
    }

    render() {
        return (
            <AppStateContext.Provider value={this.appState}>

            </AppStateContext.Provider>
        )
    }
}