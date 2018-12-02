import React from "react";
import { Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { Container } from "./components/Container";
import { Navigation } from "./components/Navigation";
import NotificationDrawer from "./components/NotificationDrawer";
import { navButtons } from "./navButtons";
import CalendarPage from "./pages/CalendarPage";
import KeysPage from "./pages/KeysPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import RegisterPage from "./pages/RegisterPage";
import RulesPage from "./pages/RulesPage";
import Session from "./pages/Session";
import StudentUnionsPage from "./pages/StudentUnionsPage";
import UserListPage from "./pages/UserListPage";
import UserProfilePage from "./pages/UserProfilePage";
import { authenticateUser } from "./reducers/authenticationReducer";
import { getUserPerms } from "./reducers/permissionReducer";
import {
  fetchOwnWatchStatus,
  setWatchCheckInterval,
} from "./reducers/sessionReducer";
import { setToken } from "./reducers/userReducer";
import { fetchUserData } from "./reducers/userReducer";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      canRender: false,
    };
  }
  public componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.setToken(localStorage.getItem("token"));
      this.props.getUserPerms(localStorage.getItem("token"));
      this.props.authenticateUser();
      this.props.fetchOwnWatchStatus(localStorage.getItem("token"));
      this.props.fetchUserData(localStorage.getItem("token"));
      /*const watchInterval = setInterval(() => {
        this.props.fetchOwnWatchStatus(localStorage.getItem("token"));
      }, 10000);
      this.props.setWatchCheckInterval(watchInterval);*/
    }
    this.setState({ canRender: true });
  }

  public componentWillUnmount() {
    clearInterval(this.props.watchInterval);
    this.props.setWatchCheckInterval(null);
  }

  public render() {
    const {
      userData,
      watchPage,
      watchRunning,
      isAuthenticated,
      peopleCount,
    } = this.props;
    if (!this.state.canRender) {
      return <div />;
    }
    return (
      <Router>
        <React.Fragment>
          <Navigation
            isAuthenticated={this.props.isAuthenticated}
            navButtons={navButtons}
            userData={userData}
          />
          <Container className="container">
            <NotificationDrawer />
            {!(watchPage || !isAuthenticated) && watchRunning && (
              <Alert bsStyle="info">
                <h5>
                  {peopleCount > 0 && (
                    <React.Fragment>
                      You are currently in an ongoing session.
                    </React.Fragment>
                  )}
                  <br />
                  <br />
                  <LinkContainer to="/session">
                    <Button bsStyle="primary">View current session</Button>
                  </LinkContainer>
                </h5>
              </Alert>
            )}
            <React.Fragment>
              <Route exact={true} path="/" component={MainPage} />
              <Route
                exact={true}
                path="/studentunions"
                component={StudentUnionsPage}
              />
              <Route exact={true} path="/keys" component={KeysPage} />
              <Route exact={true} path="/calendar" component={CalendarPage} />
              <Route exact={true} path="/rules" component={RulesPage} />
              <Route exact={true} path="/news" component={NewsPage} />
              <Route exact={true} path="/login" component={LoginPage} />
              <Route exact={true} path="/register" component={RegisterPage} />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                exact={true}
                path="/session"
                component={Session}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                exact={true}
                path="/logout"
                component={LogoutPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                path="/user"
                component={UserProfilePage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                exact={true}
                path="/users"
                component={UserListPage}
              />
            </React.Fragment>
          </Container>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.user.token,
  watchPage: state.watch.watchPage,
  watchRunning: state.watch.ownWatchRunning,
  peopleCount: state.watch.ownWatchPeopleCount,
  watchInterval: state.watch.watchCheckInterval,
  userData: state.user.userData,
});

const mapDispatchToProps = {
  authenticateUser,
  getUserPerms,
  setToken,
  fetchOwnWatchStatus,
  setWatchCheckInterval,
  fetchUserData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
