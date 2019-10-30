import * as React from 'react';

export interface IAppStateContext {
    loggedIn: boolean;
    logout: () => void;
    login: () => void;
}

const AppStateContext = React.createContext<IAppStateContext>({
    loggedIn: false,
    logout: null,
    login: null
});

export default AppStateContext; 