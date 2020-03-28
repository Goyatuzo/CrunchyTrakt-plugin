import { IAction } from "../../../global/action";

export interface CrunchyrollState {
    items: Crunchyroll.HistoryItem[];
}

const defaultState: CrunchyrollState = {
    items: []
}

export function reducer(state = defaultState, action: IAction) {
    switch (action.type) {
        default:
            return state;
    }
}