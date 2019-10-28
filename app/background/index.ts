import { IChromeMessage, ChromeMessageType } from "../classes/chrome-message";
import { browser } from 'webextension-polyfill-ts';
import TraktApi from "../trakt/trakt-api";

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === "complete") {
        const message: IChromeMessage = {
            type: ChromeMessageType.GET_VIDEO_DATA
        };
        console.log(tabId);

        browser.tabs.query({ active: true }).then(tabs => {
            tabs = tabs.filter(tab => tab.url.indexOf("vrv.co/watch") > 0);

            if (tabs.length > 0) {

                browser.tabs.sendMessage(tabs[0].id, message).then(response => {
                    console.log(response);
                });
            }
        });
    }
});