abstract class VideoPage {
    protected webHostName: string;

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
}

export default VideoPage;