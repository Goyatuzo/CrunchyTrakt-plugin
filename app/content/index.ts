import Vrv from "../websites/vrv";
import { IAppMessage, AppMessageType } from "../classes/app-message";
import { browser } from 'webextension-polyfill-ts';
import { IVideoData } from "../classes/video-info";

browser.runtime.onMessage.addListener((req: IAppMessage) => {
    return new Promise((resolve, reject) => {
        switch (req.type) {
            case AppMessageType.GET_VIDEO_DATA: {
                let videoData: IVideoData = null;

                if (req.payload === 'vrv') {
                    const vrv = new Vrv();

                    videoData = {
                        seriesName: vrv.seriesName,
                        episodeTitle: vrv.episodeTitle,
                        seasonNumber: vrv.seasonNumber,
                        episodeNumber: vrv.episodeNumber,
                        totalTimeInSeconds: vrv.totalTimeInSeconds,
                        currentTimeInSeconds: vrv.currentTimeInSeconds
                    };

                    resolve(videoData);
                } else {
                    reject(`Video data for ${req.payload} was requested`);
                }
            }
        }
    });
});