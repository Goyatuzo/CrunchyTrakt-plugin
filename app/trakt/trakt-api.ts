declare const API_ROOT: string;

import VideoInfo from '../classes/video-info';
import { traktCredentials } from '../credentials';
import { browser } from 'webextension-polyfill-ts';

export default class TraktApi {
    private authorizeStarted: boolean = false;
    private videoInfo: VideoInfo;
    private apiRoot: string = API_ROOT;
    // private redirectUrl: string = `https://${browser.runtime.id}.extensions.allizom.org`;
    private redirectUrl: string = 'https://27243ddae08af693cee0f2c5c2ee711b4b50e8f5.extensions.allizom.org/';

    constructor(paramInfo: VideoInfo = null) {
        this.videoInfo = paramInfo;
    }

    async authorize() {
        if (this.authorizeStarted) return;
        this.authorizeStarted = true;

        const authFlowOpts = {
            url: `https://trakt.tv/oauth/authorize?client_id=${traktCredentials.clientId}&redirect_uri=${encodeURI(this.redirectUrl)}&response_type=code`,
            interactive: true
        };
        let redirectURL = '';

        redirectURL = await browser.identity.launchWebAuthFlow(authFlowOpts);
        
        const parameters: Trakt.GetTokenRequest = {
            client_id: traktCredentials.clientId,
            client_secret: traktCredentials.clientSecret,
            redirect_url: this.redirectUrl,
            grant_type: 'authorization_code',
            code: this.getCodeFromRedirectUrl(redirectURL)
        }

        console.log(parameters);
    }

    getCodeFromRedirectUrl(url: string): string {
        return url.split("?")[1].split("=")[1];
    }

    requestToken() {

    }
}