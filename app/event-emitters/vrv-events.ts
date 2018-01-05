import Vrv from "../websites/vrv";
import TraktApi from '../trakt/trakt-api';

console.log("TAB UPDATING");

chrome.webNavigation.onHistoryStateUpdated(() => {
    console.log("UPDATE");
});


// console.log(chrome.tabs);
// chrome.tabs.onUpdated.addListener(() => {
//     var vrv = new Vrv();

//     console.log(vrv);
// });