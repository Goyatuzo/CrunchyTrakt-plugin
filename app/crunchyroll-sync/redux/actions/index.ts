import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";

export function requestCrunchyrollHistory(): IAction {
    return {
        type: ActionType.REQUEST_CRUNCHYROLL_HISTORY
    }
}

export function storeCrunchyrollHistory(value: any): IAction {
    return {
        type: ActionType.STORE_CRUNCHYROLL_HISTORY,
        value
    }
}