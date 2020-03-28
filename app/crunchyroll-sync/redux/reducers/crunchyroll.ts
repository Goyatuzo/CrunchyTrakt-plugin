import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";

export interface CrunchyrollState {
    historyRequest: boolean;
    items: Crunchyroll.HistoryItem[];
}

const defaultState: CrunchyrollState = {
    historyRequest: false,
    items: []
}

export function reducer(state = defaultState, action: IAction) {
    switch (action.type) {
        case ActionType.REQUEST_CRUNCHYROLL_HISTORY:
            return { ...state, historyRequest: true };
        case ActionType.STORE_CRUNCHYROLL_HISTORY:
            return { ...state, historyRequest: false, items: action.value };
        default:
            return state;
    }
}