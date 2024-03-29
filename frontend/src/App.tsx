import Container from '@material-ui/core/Container';
import { ConnectedRouter } from 'connected-react-router';
import moment from 'moment';
import 'moment/locale/fi';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import NavigationBar from './components/NavigationBar';
import NavigationDrawer from './components/NavigationDrawer';
import NotificationDrawer from './components/NotificationDrawer';
import CalendarPage from './pages/CalendarPage';
import KeysPage from './pages/KeysPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import MainPage from './pages/MainPage';
import NewsPage from './pages/NewsPage';
import RegisterPage from './pages/RegisterPage';
import DocumentsPage from './pages/DocumentsPage';
import Session from './pages/Session';
import StudentUnionsPage from './pages/StudentUnionsPage';
import UserListPage from './pages/UserListPage';
import UserProfilePage from './pages/UserProfilePage';
import { initApp } from './reducers/actions/rootActions';
import { RootAction } from './reducers/rootReducer';
import { history } from './reduxStore';
import { SessionNotification } from './components/SessionNotification';
moment.locale('fi');

const withContainer = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => (props: P) => (
    <>
        <NavigationBar />
        <NavigationDrawer />
        <SessionNotification />
        <Container>
            <Component {...props} />
        </Container>
    </>
);

const App: React.FC = () => {
    const dispatch = useDispatch<Dispatch<RootAction>>();

    useEffect(() => {
        dispatch(initApp());
    }, [dispatch]);

    return (
        <ConnectedRouter history={history}>
            <NotificationDrawer />
            <React.Fragment>
                <Route exact path="/" component={withContainer(MainPage)} />
                <Route exact path="/studentunions" component={withContainer(StudentUnionsPage)} />
                <Route exact path="/keys" component={withContainer(KeysPage)} />
                <Route exact path="/calendar" component={withContainer(CalendarPage)} />
                <Route exact path="/documents" component={withContainer(DocumentsPage)} />
                <Route exact path="/news" component={withContainer(NewsPage)} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <AuthenticatedRoute exact path="/session" component={withContainer(Session)} />
                <AuthenticatedRoute exact path="/logout" component={LogoutPage} />
                <AuthenticatedRoute path="/user" component={withContainer(UserProfilePage)} />
                <AuthenticatedRoute exact path="/users" component={withContainer(UserListPage)} />
            </React.Fragment>
        </ConnectedRouter>
    );
};

export default App;
