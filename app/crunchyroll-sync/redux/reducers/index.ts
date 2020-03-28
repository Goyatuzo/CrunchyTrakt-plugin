import { combineReducers } from 'redux';
import { CrunchyrollState, reducer as crunchyReducer } from './crunchyroll';

export interface CombinedState {
    crunchyroll: CrunchyrollState;
}

const combinedReducers = combineReducers<CombinedState>({
    crunchyroll: crunchyReducer
});

export default combinedReducers;