import VideoInfo from './video-info';
import * as request from 'request';

export default class TraktWrapper {
    private videoInfo: VideoInfo;
    private apiRoot: string = "https://api-staging.trakt.tv";

    constructor(paramInfo: VideoInfo) {
        this.videoInfo = paramInfo;
    }

    authorize() {
        const authFlowOpts: chrome.identity.WebAuthFlowOptions = {
            url: `${this.apiRoot}/oauth/authorize?client_id=`,
            interactive: true
        };

        chrome.identity.launchWebAuthFlow(authFlowOpts, responseUrl => {
            console.log(responseUrl);
        });
    }

    requestToken() {

    }

    printVideoInformation(): void {
        console.log(`${this.videoInfo.seriesName}: Season: ${this.videoInfo.seasonNumber}, Episode: ${this.videoInfo.episodeNumber}`);
    }
}