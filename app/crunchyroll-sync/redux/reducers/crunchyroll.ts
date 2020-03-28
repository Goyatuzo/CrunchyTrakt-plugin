import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";

export interface CrunchyrollState {
    historyRequest: boolean;
    sessionRequest: boolean;
    items: Crunchyroll.HistoryItem[];
    sessionId: string;
}

const defaultState: CrunchyrollState = {
    historyRequest: false,
    sessionRequest: false,
    items: [],
    sessionId: null
}

export function reducer(state = defaultState, action: IAction) {
    switch (action.type) {
        case ActionType.REQUEST_CRUNCHYROLL_HISTORY:
            return { ...state, historyRequest: true };
        case ActionType.STORE_CRUNCHYROLL_HISTORY:
            return { ...state, historyRequest: false, items: action.value };
        case ActionType.REQUEST_CRUNCHYROLL_SESSION:
            return { ...state, sessionRequest: true };
        case ActionType.STORE_CRUNCHYROLL_SESSION:
            return { ...state, sessionRequest: false, sessionId: action.value };
        default:
            return state;
    }
}