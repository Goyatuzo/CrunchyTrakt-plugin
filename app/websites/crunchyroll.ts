import VideoInfo from '../classes/video-info';

export default class CrunchyRoll extends VideoInfo {
    constructor() {
        super("http://www.crunchyroll.com/");
    }

    private get videoInformation(): HTMLElement {
        return document.getElementById("showmedia_about_media");
    }

    get episodeNumber(): string {
        throw Error("Not implemented.");
    }

    get seasonNumber(): string {
        throw Error("Not implemented.");
    }

    get episodeTitle(): string {
        throw Error("Not implemented.");
    }

    get seriesName(): string {
        const nameElement: HTMLElement = document.getElementById("showmedia_about_episode_num");

        if (nameElement) {
            return nameElement.firstElementChild.textContent;
        }

        throw new Error("No series was found on CrunchyRoll.");
    }

    get totalTimeInSeconds(): number {
        throw Error("Not implemented.");
    }
    get currentTimeInSeconds(): number {
        throw Error("Not implemented.");
    }
}