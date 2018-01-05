import Vrv from "../websites/vrv";
import { IChromeMessage, ChromeMessageType } from "../classes/chrome-message";
import { IVideoData } from "../classes/video-info";

let vrv = new Vrv();

chrome.runtime.onMessage.addListener((message: IChromeMessage, sender, sendResponse) => {
    switch (message.type) {
        case ChromeMessageType.GET_VIDEO_DATA: {

            if (document.readyState === "complete") {
                sendResponse(vrv.outputVideoData());
            }

            document.onreadystatechange = () => {
                if (document.readyState === "complete") {
                    sendResponse(vrv.outputVideoData());

                    document.onreadystatechange = null;
                }
            }
            console.log(vrv.outputVideoData());
            break;
        }

        case ChromeMessageType.GET_CURRENT_TIMESTAMP: {
            if (document.readyState === "complete") {
                sendResponse(vrv.currentTimeInSeconds);
            }

            document.onreadystatechange = () => {
                if (document.readyState === "complete") {
                    sendResponse(vrv.currentTimeInSeconds);

                    document.onreadystatechange = null;
                }
            }

            break;
        }
    }
});