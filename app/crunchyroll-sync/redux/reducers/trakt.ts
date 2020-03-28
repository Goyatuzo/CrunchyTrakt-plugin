import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";

export interface TraktState {
    searches: { [key: string]: Trakt.SearchResult };
    isRequesting: { [key: string]: boolean }
}

const defaultState: TraktState = {
    searches: {},
    isRequesting: {}
}

export function reducer(state = defaultState, action: IAction) {
    switch (action.type) {
        case ActionType.REQUEST_TRAKT_SEARCH:
            let currentRequests = { ...state.isRequesting };
            currentRequests[action.value] = true;

            return { ...state, requesting: currentRequests };
        default:
            return state;
    }
}