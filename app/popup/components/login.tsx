import * as React from 'react';
import TraktApi from '../../trakt/trakt-api';
import AppStateContext from '../contexts/app-state';

class LoginButton extends React.Component {
    static contextType = AppStateContext;
    context!: React.ContextType<typeof AppStateContext>;

    authorizeOnClick = () => {
        this.context.login();
    }
    revokeOnClick = () => {
        this.context.logout();
    }


    render() {
        if (this.context.loggedIn) {
            return <button className="button is-primary" type="button" onClick={this.revokeOnClick}>Logout</button>
        }
        
        return <button className="button is-primary" type="button" onClick={this.authorizeOnClick}>Login</button>
    }
}

export default LoginButton;