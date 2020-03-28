import { ThunkDispatch } from "redux-thunk";
import { IAction } from "../../../global/action";
import { CombinedState } from "../reducers";
import TraktApi from "../../../trakt/trakt-api";
import { ActionType } from "../../../global/actiontype";

export function getTraktInformationFor(type: Trakt.SearchType[], query: string) {
    return (dispatch: ThunkDispatch<any, any, IAction>, getState: () => CombinedState) => {
        dispatch({ type: ActionType.REQUEST_TRAKT_SEARCH });

        TraktApi.search(type, query).then(response => {
            const queryData = response.data.episode ?? response.data.movie;

            dispatch({
                type: ActionType.STORE_TRAKT_SEARCH,
                value: {
                    key: queryData.title,
                    value: queryData
                }
            })
            response.data;
        })
    }
}