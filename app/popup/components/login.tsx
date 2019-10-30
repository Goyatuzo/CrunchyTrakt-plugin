import * as React from 'react';
import TraktApi from '../../trakt/trakt-api';

const LoginButton: React.StatelessComponent = props => {
    function onClick() {
        TraktApi.authorize();
    }

    return (
        <button type="button" onClick={onClick}>Login</button>
    )
}

export default LoginButton;