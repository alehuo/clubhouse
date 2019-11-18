import { faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { login } from '../reducers/actions/userActions';
import { RootState } from '../reduxStore';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/autumn.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginPage: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const isLoggingIn = useSelector((state: RootState) => state.auth.isLoggingIn);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(login(email, password, rememberMe));
        },
        [email, password, rememberMe, dispatch],
    );

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={isLoggingIn}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={isLoggingIn}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={e => setRememberMe(e.target.checked)}
                                    disabled={isLoggingIn}
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? <CircularProgress /> : 'Sign In'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgotpassword" variant="body2" component={RouterLink}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2" component={RouterLink}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container justify="center" spacing={3}>
                            <Grid item>
                                <Button type="button" variant="contained" color="secondary">
                                    <FontAwesomeIcon icon={faGoogle} />
                                    &nbsp;&nbsp;Sign In with Google
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button type="button" variant="contained" color="secondary">
                                    <FontAwesomeIcon icon={faMicrosoft} />
                                    &nbsp;&nbsp;Sign In with Microsoft
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
