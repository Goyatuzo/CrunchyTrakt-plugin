import { ThunkDispatch } from 'redux-thunk';

import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";
import { CombinedState } from "../reducers";
import Axios from 'axios';
import { browser } from 'webextension-polyfill-ts';

export function storeCrunchyrollSession() {
    return (dispatch: ThunkDispatch<any, any, IAction>, getState: () => CombinedState) => {
        // Dispatch the request
        dispatch({ type: ActionType.REQUEST_CRUNCHYROLL_SESSION });

        browser.cookies.getAll({ domain: '.crunchyroll.com', name: 'session_id' }).then(cookies => {
            console.log(cookies);
        });
    }
}

const recentlyWatchedApi = (session_id: string, limit: number) => `http://api.crunchyroll.com/recently_watched.0.json?session_id=${session_id}&limit=${limit}`;

export function getCrunchyrollHistory() {
    return (dispatch: ThunkDispatch<any, any, IAction>, getState: () => CombinedState) => {
        dispatch({ type: ActionType.REQUEST_CRUNCHYROLL_SESSION });

        browser.cookies.getAll({ domain: '.crunchyroll.com', name: 'session_id' }).then(cookies => {
            if (cookies.length > 0) {
                dispatch({
                    type: ActionType.STORE_CRUNCHYROLL_SESSION,
                    value: cookies[0].value
                });
            }

            dispatch({ type: ActionType.REQUEST_CRUNCHYROLL_HISTORY });

            Axios.get(recentlyWatchedApi(getState().crunchyroll.sessionId, 30)).then(response => {
                console.log(response);
            })
        });
    }
}