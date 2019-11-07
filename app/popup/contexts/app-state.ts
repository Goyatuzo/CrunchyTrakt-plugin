import * as React from 'react';
import { IVideoData } from '../../classes/video-info';

export interface IAppStateContext {
    loggedIn: boolean;
    logout: () => void;
    login: () => void;
    beingPlayed: IVideoData;
}

const AppStateContext = React.createContext<IAppStateContext>({
    loggedIn: false,
    logout: null,
    login: null,
    beingPlayed: null
});

export default AppStateContext; 