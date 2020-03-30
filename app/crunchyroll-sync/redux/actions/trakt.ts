import { ThunkDispatch } from "redux-thunk";
import { IAction } from "../../../global/action";
import { CombinedState } from "../reducers";
import TraktApi from "../../../trakt/trakt-api";
import { ActionType } from "../../../global/actiontype";

export function searchTraktFor(type: Trakt.SearchType[], query: Crunchyroll.HistoryItem) {
    return (dispatch: ThunkDispatch<any, any, IAction>, getState: () => CombinedState) => {
        dispatch({ type: ActionType.REQUEST_TRAKT_SEARCH });

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