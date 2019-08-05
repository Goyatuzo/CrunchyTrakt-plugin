import Vrv from "../websites/vrv";
import { IChromeMessage, ChromeMessageType } from "../classes/chrome-message";
import { browser } from 'webextension-polyfill-ts';
import { IVideoData } from "../classes/video-info";

let vrv = new Vrv();

browser.runtime.onMessage.addListener((message: IChromeMessage, sender) => {
    console.log("MESSAGE RECEIVED");
    switch (message.type) {
        case ChromeMessageType.GET_VIDEO_DATA: {
            browser.runtime.sendMessage(null, vrv.episodeTitle);
            break;
        }

        case ChromeMessageType.GET_CURRENT_TIMESTAMP: {
            break;
        }
    }
})