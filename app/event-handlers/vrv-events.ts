import Vrv from "../websites/vrv";
import { IChromeMessage, ChromeMessageType } from "../classes/chrome-message";

let vrv = new Vrv();

chrome.runtime.onMessage.addListener((message: IChromeMessage, sender, sendResponse) => {
    console.log("MESSAGE RECEIVED");
    switch (message.type) {
        case (ChromeMessageType.GET_VIDEO_DATA): {
            console.log("GET_VIDEO_DATA RECEIVED");
            console.log(vrv);

            sendResponse(vrv);
        }
    }
});