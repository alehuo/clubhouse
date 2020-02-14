import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reduxStore';
import { push } from 'connected-react-router';

const Action = () => {
    const dispatch = useDispatch();
    return (
        <Button color="primary" size="small" onClick={() => dispatch(push('/session'))}>
            View session info
        </Button>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 600,
    },
    snackbar: {
        margin: theme.spacing(1),
    },
}));

export const SessionNotification: React.FC = () => {
    const sessionPage = useSelector((state: RootState) => state.session.sessionPage);
    const sessionRunning = useSelector((state: RootState) => state.session.ownSessionRunning);
    const isAuthenticated = useSelector((state: RootState) => state.auth.token) !== null;
    const classes = useStyles();
    if (sessionPage) {
        return null;
    }
    if (!isAuthenticated) {
        return null;
    }
    if (!sessionRunning) {
        return null;
    }
    return (
        <div className={classes.root}>
            <SnackbarContent
                className={classes.snackbar}
                message="You are currently in an ongoing session."
                action={<Action />}
            />
        </div>
    );
};
