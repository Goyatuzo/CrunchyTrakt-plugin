import VideoInfo from './video-info';

export default class TraktWrapper {
    private videoInfo: VideoInfo;

    constructor(paramInfo: VideoInfo) {
        this.videoInfo = paramInfo;
    }

    printVideoInformation(): void {
        console.log(`${this.videoInfo.seriesName}: Season: ${this.videoInfo.seasonNumber}, Episode: ${this.videoInfo.episodeNumber}`);
    }
}