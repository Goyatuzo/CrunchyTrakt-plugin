import * as React from 'react';
import TraktApi from '../../trakt/trakt-api';
import AppStateContext from '../contexts/app-state';

class LoginButton extends React.Component {
    static contextType = AppStateContext;
    context!: React.ContextType<typeof AppStateContext>;

    authorizeOnClick = () => {
        TraktApi.authorize();

        this.context.loggedIn = true;
    }
    revokeOnClick = () => {
        TraktApi.revokeToken();

        this.context.loggedIn = false;
    }


    render() {
        return (
            <>
                {
                    this.context.loggedIn ?
                        <button type="button" onClick={this.revokeOnClick} > Logout</button>
                        :
                        <button type="button" onClick={this.authorizeOnClick}>Login</button>
                }
            </>
        )
    }
}

export default LoginButton;