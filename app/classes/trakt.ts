import VideoInfo from './video-info';

export default class TraktWrapper {
    private videoInfo: VideoInfo;

    constructor(paramInfo: VideoInfo) {
        this.videoInfo = paramInfo;
    }

    printSeriesName(): void {
        console.log(this.videoInfo.seriesName);
    }
}