import { stringEquals } from '../helpers/string-equals';
import { MessageType, IChromeMessage } from '../classes/chrome-message';

chrome.runtime.onMessage.addListener((msg: IChromeMessage, sender, sendResponse) => {
    switch (msg.type) {
        case MessageType.SCROBBLE: {
        }
        default: {
            return;
        }
    }
});