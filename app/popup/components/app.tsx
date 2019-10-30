import * as React from 'react';

import AppStateContext, { IAppStateContext } from '../contexts/app-state';
import TraktApi from '../../trakt/trakt-api';
import Login from './login'

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
                TraktApi.authorize();
                this.setState({ loggedIn: true })
            }
        };
    };

    componentDidMount() {
        TraktApi.userLoggedIn().then(isLoggedIn => {
            this.setState({
                loggedIn: isLoggedIn
            });
        })
    }

    render() {
        return (
            <AppStateContext.Provider value={this.state}>
                <Login />
            </AppStateContext.Provider>
        )
    }
}

export default App;