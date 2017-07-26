import VideoInfo from '../classes/video-info';
import * as request from 'request';
import { traktCredentials } from '../credentials';

export default class TraktApi {
    private videoInfo: VideoInfo;
    private apiRoot: string = "https://api-staging.trakt.tv";
    private redirectUrl: string = `https://${chrome.runtime.id}.chromiumapp.org`;

    constructor(paramInfo: VideoInfo) {
        this.videoInfo = paramInfo;
    }

    authorize() {
        const authFlowOpts: chrome.identity.WebAuthFlowOptions = {
            url: `${this.apiRoot}/oauth/authorize?client_id=${traktCredentials.clientId}&redirect_Uri=${this.redirectUrl}&response_type=code`,
            interactive: true
        };

        console.log("AUTHORIZING");

        chrome.identity.launchWebAuthFlow(authFlowOpts, responseUrl => {
            const tokenParams: Trakt.GetTokenRequest = {
                code: this.getCodeFromRedirectUrl(responseUrl),
                client_id: traktCredentials.clientId,
                client_secret: traktCredentials.clientSecret,
                redirect_url: this.redirectUrl,
                grant_type: "authorization_code"
            };
        });
    }

    getCodeFromRedirectUrl(url: string): string {
        return url.split("?")[1].split("=")[1];
    }

    requestToken() {

    }
}