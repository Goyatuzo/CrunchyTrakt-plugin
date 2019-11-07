import Vrv from "../websites/vrv";
import { IAppMessage, AppMessageType } from "../classes/app-message";
import { browser } from 'webextension-polyfill-ts';

console.log("Content script INIT");

browser.runtime.onMessage.addListener((req: IAppMessage) => {
    return new Promise((resolve, reject) => {
        switch (req.type) {
            case AppMessageType.GET_VIDEO_DATA: {
                if (req.payload === 'vrv') {
                    const vrv = new Vrv();
                    console.log(vrv.seriesName);
                    resolve(vrv.seriesName);
                } else {
                    reject(`Video data for ${req.payload} was requested`);
                }
            }
        }
    });
});