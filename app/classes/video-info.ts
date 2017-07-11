abstract class VideoPage {
    protected webHostName: string;
    protected startTime: Date;
    protected endTime: Date;
    protected videoIsPlaying: boolean

    constructor(hostName: string) {
        this.webHostName = hostName;
    }

    /**
     * Get the season number if applicable from the current series page.
     */
    abstract get seasonNumber(): number;
    /**
     * Get the episode number if applicable from the current series page.
     */
    abstract get episodeNumber(): number;
    /**
     * Get the episode title if applicable from the current series page.
     */
    abstract get episodeTitle(): string;
    /**
     * Get the name of the series if applicable from the current series page.
     */
    abstract get seriesName(): string;
    /**
     * Get the total time of the video if applicable from the current series page.
     */
    abstract get totalTimeInSeconds(): number;
    /**
     * Get the current time of the video if applicable from the current series page.
     */
    abstract get currentTimeInSeconds(): number;
    /**
     * Call this function when the user begins viewing a video.
     */
    startViewing(): void {
        this.videoIsPlaying = true;
        this.startTime = new Date(Date.now());
    }
    /**
     * Call this function when the user ends viewing a video.
     */
    endViewing(): void {
        this.videoIsPlaying = false;
        this.endTime = new Date(Date.now());
    }
}

export default VideoPage;