import { IChromeMessage, ChromeMessageType } from "../classes/chrome-message";



chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    const message: IChromeMessage = {
        type: ChromeMessageType.GET_VIDEO_DATA
    };

    chrome.tabs.query({ active: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, message, response => {
            console.log(response);
        });
    });
});