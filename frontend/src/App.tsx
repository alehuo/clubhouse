import { User } from "@alehuo/clubhouse-shared";
import moment from "moment";
import "moment/locale/fi";
moment.locale("fi");
import React from "react";
import { Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { Container } from "./components/Container";
import CustomOverlay from "./components/CustomOverlay";
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
import { authenticateUser } from "./reducers/actions/authenticationActions";
import {
  fetchOwnSessionStatus,
  setSessionCheckInterval,
} from "./reducers/actions/sessionActions";
import { fetchUserData } from "./reducers/actions/userActions";
import { setToken } from "./reducers/actions/userActions";
import { getUserPerms } from "./reducers/permissionReducer";
import { RootState } from "./reduxStore";

interface Props {
  sessionInterval?: NodeJS.Timeout;
  userData?: User;
  sessionPage: boolean;
  sessionRunning: boolean;
  peopleCount: number;
  token: string;
  setToken: any;
  getUserPerms: any;
  authenticateUser: any;
  fetchOwnSessionStatus: any;
  fetchUserData: any;
  setSessionCheckInterval: any;
}

class App extends React.Component<Props> {
  public componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.setToken(token);
      this.props.getUserPerms(token);
      this.props.fetchOwnSessionStatus(token);
      this.props.fetchUserData(token);
      /*const watchInterval = setInterval(() => {
        this.props.fetchOwnWatchStatus(localStorage.getItem("token"));
      }, 10000);
      this.props.setWatchCheckInterval(watchInterval);*/
      this.props.authenticateUser();
    }
  }

  public componentWillUnmount() {
    if (this.props.sessionInterval) {
      clearInterval(this.props.sessionInterval);
      this.props.setSessionCheckInterval(null);
    }
  }

  public render() {
    const { userData, sessionPage, sessionRunning, peopleCount } = this.props;
    return (
      <Router>
        <React.Fragment>
          <Navigation
            isAuthenticated={this.props.token !== ""}
            navButtons={navButtons}
            userData={userData}
          />
          <Container className="container">
            <NotificationDrawer />
            {!(sessionPage || !(this.props.token !== "")) && sessionRunning && (
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
                    <CustomOverlay
                      id="currentSessionInfo"
                      text="View current session info."
                    >
                      <Button bsStyle="primary">View current session</Button>
                    </CustomOverlay>
                  </LinkContainer>
                </h5>
              </Alert>
            )}
            <React.Fragment>
              <Route exact path="/" component={MainPage} />
              <Route
                exact
                path="/studentunions"
                component={StudentUnionsPage}
              />
              <Route
                exact
                path="/keys"
                token={this.props.token}
                component={KeysPage}
              />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/rules" component={RulesPage} />
              <Route exact path="/news" component={NewsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <AuthenticatedRoute
                isAuthenticated={this.props.token !== ""}
                exact
                path="/session"
                component={Session}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.token !== ""}
                exact
                path="/logout"
                component={LogoutPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.token !== ""}
                path="/user"
                component={UserProfilePage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.token !== ""}
                exact
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

const mapStateToProps = (state: RootState) => ({
  token: state.user.token,
  sessionPage: state.session.sessionPage,
  sessionRunning: state.session.ownSessionRunning,
  peopleCount: state.session.ownSessionPeopleCount,
  sessionnterval: state.session.sessionCheckInterval,
  userData: state.user.userData,
});

const mapDispatchToProps = {
  authenticateUser,
  getUserPerms,
  setToken,
  fetchOwnSessionStatus,
  setSessionCheckInterval,
  fetchUserData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
