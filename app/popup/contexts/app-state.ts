import * as React from 'react';

export interface IAppStateContext {
    loggedIn: boolean;
}

const AppStateContext = React.createContext<IAppStateContext>({ loggedIn: false });
export default AppStateContext; 