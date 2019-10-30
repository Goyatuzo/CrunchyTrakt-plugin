declare const API_ROOT: string;

import axios from 'axios';
import VideoInfo from '../classes/video-info';
import { traktCredentials } from '../credentials';
import { browser } from 'webextension-polyfill-ts';
import StorageWrap from '../storage';

export class TraktApiHandler {
    private authorizeStarted: boolean = false;
    private apiRoot: string = API_ROOT;
    // private redirectUrl: string = `https://${browser.runtime.id}.extensions.allizom.org`;
    private redirectUrl: string = 'https://27243ddae08af693cee0f2c5c2ee711b4b50e8f5.extensions.allizom.org/';

    async authorize() {
        if (this.authorizeStarted) return;
        this.authorizeStarted = true;

        const authRoot = this.apiRoot.replace('api-', '');

        const authFlowOpts = {
            url: `${authRoot}/oauth/authorize?client_id=${traktCredentials.clientId}&redirect_uri=${encodeURI(this.redirectUrl)}&response_type=code`,
            interactive: true
        };
        let redirectURL = '';

        try {
            redirectURL = await browser.identity.launchWebAuthFlow(authFlowOpts);
        } catch (err) {
            console.error(err);
        }

        this.getAccessToken(redirectURL);
    }

    getCodeFromRedirectUrl(url: string): string {
        return url.split("?")[1].split("=")[1];
    }

    private async getAccessToken(code: string): Promise<void> {
        const parameters: Trakt.GetTokenRequest = {
            client_id: traktCredentials.clientId,
            client_secret: traktCredentials.clientSecret,
            redirect_uri: this.redirectUrl,
            grant_type: 'authorization_code',
            code: this.getCodeFromRedirectUrl(code)
        }
        
        try {
            const response = await axios.post(`${this.apiRoot}/oauth/token`, parameters, {
                headers: {
                    'trakt-api-key': traktCredentials.clientId,
                    'trakt-api-version': 2,
                    'Content-Type': 'application/json'
                }
            });

            StorageWrap.set('trakt-oauth-response', response.data);
        } catch (err) {
            console.error(err);
        }
    }
}

const TraktApi = new TraktApiHandler();

export default TraktApi; 