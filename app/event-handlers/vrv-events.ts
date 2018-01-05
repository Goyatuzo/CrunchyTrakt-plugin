import Vrv from "../websites/vrv";
import { IChromeMessage, ChromeMessageType } from "../classes/chrome-message";
import { IVideoData } from "../classes/video-info";

let vrv = new Vrv();

chrome.runtime.onMessage.addListener((message: IChromeMessage, sender, sendResponse) => {
    console.log("MESSAGE RECEIVED");
    switch (message.type) {
        case ChromeMessageType.GET_VIDEO_DATA: {

            sendResponse(vrv.outputVideoData());

            break;
        }

        case ChromeMessageType.GET_CURRENT_TIMESTAMP: {
            break;
        }
    }
});