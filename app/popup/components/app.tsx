import * as React from 'react';

import AppStateContext, { IAppStateContext } from '../contexts/app-state';
import TraktApi from '../../trakt/trakt-api';
import Login from './login'
import { AppMessageType, IAppMessage } from '../../classes/app-message';
import { browser } from 'webextension-polyfill-ts';

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

    async sendMessage(payload: IAppMessage): Promise<any> {
        const tabs = await browser.tabs.query({ url: `*://*.vrv.co/*`, active: true });
        if (tabs.length > 0) {
            return browser.tabs.sendMessage(tabs[0].id, payload);
        } else {
            return new Promise((resolve, reject) => reject('No tabs are loaded to vrv'));
        }
    }

    componentDidMount() {
        TraktApi.userLoggedIn().then(isLoggedIn => {
            this.setState({
                loggedIn: isLoggedIn
            });
        });

        this.sendMessage({type: AppMessageType.GET_VIDEO_DATA, payload: 'vrv'}).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    render() {
        return (
            <AppStateContext.Provider value={this.state}>
                <div className="panel">
                    <div className="panel-head">
                        <Login />
                    </div>

                    <div className="panel-body">
                        <p>HELLO</p>
                    </div>
                </div>
            </AppStateContext.Provider >
        )
    }
}

export default App;