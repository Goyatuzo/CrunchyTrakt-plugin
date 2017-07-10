import VideoInfo from '../classes/video-info';

class CrunchyRoll extends VideoInfo {
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
        console.log(nameElement);
        return "";
    }
}