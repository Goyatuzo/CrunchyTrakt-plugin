import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";

export interface TraktState {
    results: { [key: string]: Trakt.SearchResult };
    isRequesting: { [key: string]: boolean }
}

const defaultState: TraktState = {
    results: {},
    isRequesting: {}
}

export function reducer(state = defaultState, action: IAction) {
    switch (action.type) {
        case ActionType.REQUEST_TRAKT_SEARCH: {
            let currentRequests = { ...state.isRequesting };
            currentRequests[action.value] = true;

            return { ...state, requesting: currentRequests };
        }
        case ActionType.STORE_TRAKT_SEARCH: {
            let currentResults = { ...state.results };
            let currentRequests = { ...state.isRequesting };

            currentResults[action.value.key] = action.value.value;
            currentRequests[action.value.key] = false;

            return { ...state, results: currentResults, isRequesting: currentRequests };
        }
        default:
            return state;
    }
}