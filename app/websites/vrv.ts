import VideoInfo from '../classes/video-info';

export default class Vrv extends VideoInfo {
    constructor() {
        super("https://www.vrv.co/");
    }

    get episodeNumber(): number {
        const episodeTitle = document.getElementsByClassName("title") as HTMLCollectionOf<HTMLDivElement>;
        return 0;
    }

    get seasonNumber(): number {
        const seasonNumber = document.getElementsByClassName("season") as HTMLCollectionOf<HTMLDivElement>;
        return parseInt(seasonNumber[0].innerText);
    }

    get episodeTitle(): string {
        const episodeTitle = document.getElementsByClassName("title") as HTMLCollectionOf<HTMLDivElement>;
        return episodeTitle[0].innerText;
    }

    get seriesName(): string {
        const seriesTitle = document.getElementsByClassName("video-title") as HTMLCollectionOf<HTMLDivElement>;

        return seriesTitle[0].innerText;
    }

    get totalTimeInSeconds(): number {
        throw Error("Not implemented.");
    }
    get currentTimeInSeconds(): number {
        throw Error("Not implemented.");
    }
}