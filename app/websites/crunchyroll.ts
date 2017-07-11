import VideoInfo from '../classes/video-info';

export default class CrunchyRoll extends VideoInfo {
    constructor() {
        super("http://www.crunchyroll.com/");
    }

    private get seasonAndEpisodeString(): string {
        const element: HTMLElement = document.getElementById("showmedia_about_media");

        if (element) {
            return element.lastElementChild.textContent;
        }

        console.error("Cannot find season and episode element.");
        return null;
    }

    get episodeNumber(): number {
        const seasonAndEpisode = this.seasonAndEpisodeString;
        const tokens = seasonAndEpisode.split(',');
        let matched: string;

        // If there are 2 tokens, then the second one is the episode number.
        if (tokens.length > 1) {
            matched = tokens[1];
        } else {
            matched = tokens[0];
        }
        const number = matched.match(/\d+\.?\d*|\.\d+/);

        if (number.length > 0) {
            return parseInt(number[0]);
        }

        return null;
    }

    get seasonNumber(): number {
        const seasonAndEpisode = this.seasonAndEpisodeString;
        const tokens = seasonAndEpisode.split(',');

        if (tokens.length > 1) {
            const number = tokens[0].match(/\d+\.?\d*|\.\d+/);

            if (number.length > 0) {
                return parseInt(number[0]);
            }
        }

        return null;
    }

    get episodeTitle(): string {
        const nameElement: HTMLElement = document.getElementById("showmedia_about_name");

        if (nameElement) {
            return nameElement.textContent;
        }

        console.error("Episode title was not found on CrunchyRoll.");
        return null
    }

    get seriesName(): string {
        const nameElement: HTMLElement = document.getElementById("showmedia_about_episode_num");

        if (nameElement) {
            return nameElement.firstElementChild.textContent;
        }

        console.error("No series was found on CrunchyRoll.");
        return null
    }

    get totalTimeInSeconds(): number {
        throw Error("Not implemented.");
    }
    get currentTimeInSeconds(): number {
        throw Error("Not implemented.");
    }
}