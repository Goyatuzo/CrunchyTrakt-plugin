import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";

export interface TraktState {
    results: { [key: string]: Trakt.SearchResult };
    isRequesting: { [key: string]: boolean };
    historicScrobbles: { [key: string]: Trakt.ScrobbleHistory };
    isRequestingHistoricScrobbles: { [key: string]: boolean };
}

const defaultState: TraktState = {
    results: {},
    isRequesting: {},
    historicScrobbles: {},
    isRequestingHistoricScrobbles: {}
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

        case ActionType.REQUEST_TRAKT_EPISODE_HISTORY: {
            let currentRequests = { ...state.isRequestingHistoricScrobbles };
            currentRequests[action.value] = true;

            return { ...state, isRequestingHistoricScrobbles: currentRequests };
        }

        case ActionType.STORE_TRAKT_EPISODE_HISTORY: {
            let currentHistory = { ...state.historicScrobbles };
            let currentRequests = { ...state.isRequestingHistoricScrobbles };

            currentHistory[action.value.key] = action.value.value;
            currentRequests[action.value.key] = false;

            return { ...state, historicScrobbles: currentHistory, isRequestingHistoricScrobbles: currentRequests };
        }

        case ActionType.START_TRAKT_EPISODE_HISTORY_ADD: {
            return state;
        }

        case ActionType.SUCCESS_TRAKT_EPISODE_HISTORY_ADD: {
            return state;
        }

        default:
            return state;
    }
}