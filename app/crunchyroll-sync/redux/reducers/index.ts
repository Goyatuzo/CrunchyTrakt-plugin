import { combineReducers } from 'redux';
import { CrunchyrollState, reducer as crunchyReducer } from './crunchyroll';
import { TraktState, reducer as traktReducer } from './trakt';

export interface CombinedState {
    crunchyroll: CrunchyrollState;
    trakt: TraktState;
}

const combinedReducers = combineReducers<CombinedState>({
    crunchyroll: crunchyReducer,
    trakt: traktReducer
});

export default combinedReducers;