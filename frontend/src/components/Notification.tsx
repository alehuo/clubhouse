import { makeStyles, Snackbar, Theme } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import React from 'react';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

interface Props {
    className?: string;
    message?: string;
    text: string;
    variant: keyof typeof variantIcon;
}

const Notification = (props: Props) => {
    const classes = useStyles1();
    const { message, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <Snackbar
            open={true}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            {...other}
        />
    );
};

export default Notification;
