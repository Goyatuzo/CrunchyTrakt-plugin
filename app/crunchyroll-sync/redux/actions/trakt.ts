import { ThunkDispatch } from "redux-thunk";
import { IAction } from "../../../global/action";
import { CombinedState } from "../reducers";
import TraktApi from "../../../trakt/trakt-api";
import { ActionType } from "../../../global/actiontype";

export async function searchTraktFor(type: Trakt.SearchType[], query: Crunchyroll.HistoryItem) {
    return (dispatch: ThunkDispatch<any, any, IAction>, getState: () => CombinedState) => {
        dispatch({ type: ActionType.REQUEST_TRAKT_SEARCH, value: query.media.name });

        // // If query has been made, or is being made, don't do anything.
        // if (query in getState().trakt.results || getState().trakt.isRequesting[query]) {
        //     return;
        // }

        TraktApi.search(type, query.media.name).then(response => {
            const seriesMatch = response.data.filter(data => query.series.name === data.show.title);

            dispatch({
                type: ActionType.STORE_TRAKT_SEARCH,
                value: {
                    key: query.media.name,
                    value: seriesMatch[0]
                }
            });
        })
    }
}

export function getTraktHistoryFor(crunchy: Crunchyroll.HistoryItem) {
    return (dispatch: ThunkDispatch<any, any, IAction>, getState: () => CombinedState) => {
        const key = `${crunchy.media.media_id}${crunchy.timestamp}`

        dispatch({
            type: ActionType.REQUEST_TRAKT_EPISODE_HISTORY,
            value: key
        });

        // // If query has been made, or is being made, don't do anything.
        // if (query in getState().trakt.results || getState().trakt.isRequesting[query]) {
        //     return;
        // }

        const state = getState();

        if (state.trakt.results[crunchy.media.name]) {
            const trakt = state.trakt.results[crunchy.media.name];

            TraktApi.getEpisodesFromHistory(trakt).then(response => {

                dispatch({
                    type: ActionType.STORE_TRAKT_SEARCH,
                    value: {
                        key: key,
                        value: response.data
                    }
                });
            })
        }
    }
}