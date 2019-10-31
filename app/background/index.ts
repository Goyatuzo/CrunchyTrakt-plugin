import { IChromeMessage, ChromeMessageType } from "../classes/chrome-message";
import { browser } from 'webextension-polyfill-ts';


browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.status) return;

    if (changeInfo.status === "complete" && tab.url.match("vrv.co")) {
        browser.pageAction.show(tabId);
    } else {
        browser.pageAction.hide(tabId);
    }

    // browser.tabs.query({ active: true }).then(tabs => {
    //     tabs = tabs.filter(tab => tab.url.indexOf("vrv.co/watch") > 0);

    //     if (tabs.length > 0) {

    //         browser.tabs.sendMessage(tabs[0].id, message).then(response => {
    //             console.log(response);
    //         });
    //     }
    // });
});