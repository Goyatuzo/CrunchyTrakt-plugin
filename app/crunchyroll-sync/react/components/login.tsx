import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';
import { loginToTrakt, logoutOfTrakt } from '../../redux/actions';

interface ExternalProps {

}

interface StateToProps {
    isLoggedIn: boolean;
}

interface DispatchToProps {
    login(): () => void;
    logout(): () => void;
}

type TraktLoginProps = ExternalProps & StateToProps & DispatchToProps;

const TraktLoginComponentComp: React.StatelessComponent<TraktLoginProps> = props => {
    const loginStep = (evt: React.MouseEvent<HTMLButtonElement>) => {
        props.login();
    }

    const logoutStep = (evt: React.MouseEvent<HTMLButtonElement>) => {
        props.logout();
    }


    if (props.isLoggedIn) {
        return <button className="button is-primary" type="button" onClick={logoutStep}>Logout</button>
    }

    return <button className="button is-primary" type="button" onClick={loginStep}>Log into Trakt</button>
}


const TraktLoginComponent = connect<StateToProps, DispatchToProps, ExternalProps, CombinedState>(state => {
    return {
        isLoggedIn: state.trakt.isLoggedIn
    }
}, (dispatch, ext) => {
    return {
        login: () => dispatch(loginToTrakt() as any),
        logout: () => dispatch(logoutOfTrakt() as any)
    }
})(TraktLoginComponentComp);

export default TraktLoginComponent;