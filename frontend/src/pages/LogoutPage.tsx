import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../reduxStore';
import { deAuthenticateUser } from './../reducers/actions/authenticationActions';
import { successMessage } from './../reducers/actions/notificationActions';
import { setSessionCheckInterval } from './../reducers/actions/sessionActions';

interface Props {
    sessionInterval?: NodeJS.Timeout;
    setSessionCheckInterval: any;
    deAuthenticateUser: any;
    successMessage: any;
}

const LogoutPage: React.FC<Props> = (props) => {
    useEffect(() => {
        if (props.sessionInterval) {
            clearInterval(props.sessionInterval);
        }
        props.setSessionCheckInterval(undefined);
        localStorage.clear();
        props.deAuthenticateUser();
        props.successMessage('You have been logged out.');
    }, [props])

    return <Redirect to="/" />;
}

const mapStateToProps = (state: RootState) => ({
    sessionInterval: state.session.sessionCheckInterval,
});

const mapDispatchToProps = {
    deAuthenticateUser,
    successMessage,
    setSessionCheckInterval,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
