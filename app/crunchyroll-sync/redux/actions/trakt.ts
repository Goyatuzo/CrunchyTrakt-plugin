import { ThunkDispatch } from "redux-thunk";
import { IAction } from "../../../global/action";
import { CombinedState } from "../reducers";
import TraktApi from "../../../trakt/trakt-api";
import { ActionType } from "../../../global/actiontype";
import { AxiosResponse } from "axios";
import StorageWrap from "../../../storage";

async function keepSearching(type: Trakt.SearchType[], query: Crunchyroll.HistoryItem) {
    let page = 0;
    let results = await TraktApi.search(type, query.media.name, page++);

    // Keep checking while there are no matches, but results keep coming in
    while (page < 20 && results?.data?.length > 0) {
        results = await TraktApi.search(type, query.media.name, page++);

        const seriesMatch = results.data.filter(data => query.series.name.toUpperCase() === data.show.title.toUpperCase());

        if (seriesMatch.length > 0) {
            return seriesMatch[0];
        }
    }

    return null;
}

export function searchTraktFor(type: Trakt.SearchType[], query: Crunchyroll.HistoryItem) {
    return (dispatch: ThunkDispatch<any, any, IAction>, _: () => CombinedState) => {
        dispatch({ type: ActionType.REQUEST_TRAKT_SEARCH, value: query.media.media_id });

        keepSearching(type, query).then(match => {
            dispatch({
                type: ActionType.STORE_TRAKT_SEARCH,
                value: {
                    key: query.media.media_id,
                    value: match
                }
            });

            dispatch(getTraktHistoryFor(query));
        })
    }
}

export function getTraktHistoryFor(crunchy: Crunchyroll.HistoryItem) {
    return (dispatch: ThunkDispatch<any, any, IAction>, getState: () => CombinedState) => {
        const key = crunchy.media.media_id;

        dispatch({
            type: ActionType.REQUEST_TRAKT_EPISODE_HISTORY,
            value: key
        });

        // // If query has been made, or is being made, don't do anything.
        // if (query in getState().trakt.results || getState().trakt.isRequesting[query]) {
        //     return;
        // }

        const state = getState();

        if (state.trakt.results[crunchy.media.media_id]) {
            const trakt = state.trakt.results[crunchy.media.media_id];

            TraktApi.getEpisodesFromHistory(trakt.episode).then(response => {
                dispatch({
                    type: ActionType.STORE_TRAKT_EPISODE_HISTORY,
                    value: {
                        key: key,
                        value: response.data
                    }
                });
            });
        }
    }
}

export function addTraktHistory(crunchyItem: Crunchyroll.HistoryItem, traktItem: Trakt.SearchResult) {
    return (dispatch: ThunkDispatch<any, any, IAction>, _: () => CombinedState) => {
        const key = `${crunchyItem.media.media_id}${crunchyItem.timestamp}`;

        dispatch({ type: ActionType.START_TRAKT_EPISODE_HISTORY_ADD, value: key });

        TraktApi.addEpisodesToHistory([crunchyItem], [traktItem]).then(response => {
            if (response.data.added.episodes === 1) {
                dispatch({ type: ActionType.SUCCESS_TRAKT_EPISODE_HISTORY_ADD, value: key });
            } else {
                dispatch({ type: ActionType.ERROR_TRAKT_EPISODE_HISTORY_ADD, value: key });
            }
        }).catch(err => {
            dispatch({ type: ActionType.ERROR_TRAKT_EPISODE_HISTORY_ADD, value: key });
        });
    }
}

export function loginToTrakt() {
    return (dispatch: ThunkDispatch<any, any, IAction>, _: () => CombinedState) => {
        TraktApi.authorize().then(_ => {
            dispatch({ type: ActionType.TRAKT_USER_LOGGED_IN })
        });
    }
}

export function logoutOfTrakt() {
    return (dispatch: ThunkDispatch<any, any, IAction>, _: () => CombinedState) => {
        TraktApi.revokeToken().then(_ => {
            dispatch({ type: ActionType.TRAKT_USER_LOGGED_OUT })
        });
    }
}

export function checkLogin() {
    return (dispatch: ThunkDispatch<any, any, IAction>, _: () => CombinedState) => {
        StorageWrap.getTokenData().then(token => {
            if (token) {
                dispatch({ type: ActionType.TRAKT_USER_LOGGED_IN });
            } else {
                dispatch({ type: ActionType.TRAKT_USER_LOGGED_OUT })
            }
        }).catch(err => {
            dispatch({ type: ActionType.TRAKT_USER_LOGGED_OUT })
        })
    }
}