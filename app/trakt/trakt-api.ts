declare const API_ROOT: string;

import axios, { AxiosRequestConfig } from 'axios';
import VideoInfo from '../classes/video-info';
import { traktCredentials } from '../credentials';
import { browser } from 'webextension-polyfill-ts';
import StorageWrap from '../storage';

export class TraktApiHandler {
    private apiRoot: string = API_ROOT;
    // private redirectUrl: string = `https://${browser.runtime.id}.extensions.allizom.org`;
    private redirectUrl: string = 'https://27243ddae08af693cee0f2c5c2ee711b4b50e8f5.extensions.allizom.org/';
    private requestConfig: AxiosRequestConfig = {
        headers: {
            'trakt-api-key': traktCredentials.clientId,
            'trakt-api-version': 2,
            'Content-Type': 'application/json'
        }
    };

    async userLoggedIn(): Promise<boolean> {
        return await StorageWrap.getTokenData() !== undefined && StorageWrap.getTokenData() !== null;
    }

    /**
     * Initialize the authorization flow, and if applicable, get the token.
     */
    async authorize() {
        const authRoot = this.apiRoot.replace('api-', '');

        const authFlowOpts = {
            url: `${authRoot}/oauth/authorize?client_id=${traktCredentials.clientId}&redirect_uri=${encodeURI(this.redirectUrl)}&response_type=code`,
            interactive: true
        };
        let redirectURL = await browser.identity.launchWebAuthFlow(authFlowOpts);

        this.getAccessToken(redirectURL);
    }

    /**
     * Revoke a given token
     */
    async revokeToken(): Promise<void> {
        const parameters: Trakt.RevokeTokenRequest = {
            client_id: traktCredentials.clientId,
            client_secret: traktCredentials.clientSecret,
            token: (await StorageWrap.getTokenData()).access_token
        };

        axios.post(`${this.apiRoot}/oauth/revoke`, parameters, this.requestConfig).then(response => {
            StorageWrap.deleteTokenData();
        });
    }

    /**
     * Grab the code from the initial oauth step's redirect URL.
     * @param url The URL returned from the initial oauth step.
     */
    private getCodeFromRedirectUrl(url: string): string {
        return url.split("?")[1].split("=")[1];
    }

    /**
     * Given the code, post the Trakt API to receive a token.
     * @param code 
     */
    private async getAccessToken(code: string): Promise<void> {
        const parameters: Trakt.GetTokenRequest = {
            client_id: traktCredentials.clientId,
            client_secret: traktCredentials.clientSecret,
            redirect_uri: this.redirectUrl,
            grant_type: 'authorization_code',
            code: this.getCodeFromRedirectUrl(code)
        }

        const response = await axios.post(`${this.apiRoot}/oauth/token`, parameters, this.requestConfig);

        StorageWrap.setTokenData(response.data);
    }

    /**
     * Search Trakt for whatever is desired.
     * @param type The type of media to be searched.
     * @param query What is being searched.
     */
    public async search(type: Trakt.SearchType[], query: string) {
        return await axios.get<Trakt.SearchResult>(`${this.apiRoot}/search/${type.join(',')}?query=${query}`, this.requestConfig);
    }
}

const TraktApi = new TraktApiHandler();

export default TraktApi; 