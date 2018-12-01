import React from "react";
import {
  Alert,
  Button,
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.css";
import NotificationDrawer from "./components/NotificationDrawer";
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

const AuthenticatedRoute: React.SFC<any> = ({
  component: Component,
  isAuthenticated,
  // @ts-ignore
  ...rest,
}) => (
  <Route
    {...rest}
    render={(props) => {
      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);
class App extends React.Component<any, any> {
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
  }

  public componentWillUnmount() {
    clearInterval(this.props.watchInterval);
    this.props.setWatchCheckInterval(null);
  }

  public isUserLoggedIn = () => this.props.isAuthenticated === true;

  public render() {
    const navButtons = [
      {
        url: "/news",
        icon: "comments",
        text: "News",
      },
      {
        url: "/calendar",
        icon: "calendar",
        text: "Calendar",
      },
      {
        url: "/keys",
        icon: "key",
        text: "Keys",
      },
      {
        url: "/studentunions",
        icon: "users",
        text: "Student unions",
      },
      {
        url: "/rules",
        icon: "list-ol",
        text: "Rules",
      },
      {
        url: "/users",
        icon: "users",
        text: "Users",
      },
    ];
    return (
      <Router>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <LinkContainer to="/">
                <Navbar.Brand>Clubhouse management</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                {this.props.isAuthenticated && (
                  <NavDropdown title={"Menu"} id="1">
                    {navButtons.map((navButton) => (
                      <LinkContainer to={navButton.url} key={navButton.url}>
                        <NavItem eventKey={1}>
                          <FontAwesome name={navButton.icon} /> {navButton.text}
                        </NavItem>
                      </LinkContainer>
                    ))}
                  </NavDropdown>
                )}
              </Nav>
              <Nav pullRight>
                {this.props.isAuthenticated ? (
                  <React.Fragment>
                    <LinkContainer to="/session">
                      <NavItem>
                        <FontAwesome name="beer" />{" "}
                        <span>
                          <b>Session</b>
                        </span>
                      </NavItem>
                    </LinkContainer>
                    <NavDropdown
                      eventKey={6}
                      title={
                        <React.Fragment>
                          <FontAwesome name="user" />{" "}
                          <span>{this.props.userData.email || ""}</span>
                        </React.Fragment>
                      }
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/user/info">
                        <MenuItem eventKey={6.1}>
                          <FontAwesome name="user" /> My information
                        </MenuItem>
                      </LinkContainer>
                      <LinkContainer to="/user/history">
                        <MenuItem eventKey={6.2}>
                          <FontAwesome name="history" /> My history
                        </MenuItem>
                      </LinkContainer>
                      <LinkContainer to="/user/keys">
                        <MenuItem eventKey={6.3}>
                          <FontAwesome name="key" /> My keys
                        </MenuItem>
                      </LinkContainer>
                      <LinkContainer to="/logout">
                        <MenuItem eventKey={6.4}>
                          <FontAwesome name="sign-out-alt" /> Logout
                        </MenuItem>
                      </LinkContainer>
                    </NavDropdown>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <LinkContainer to="/login">
                      <NavItem eventKey={6}>
                        <FontAwesome name="sign-out-alt" /> Login
                      </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <NavItem eventKey={6}>
                        <FontAwesome name="sign-in-alt" /> Register
                      </NavItem>
                    </LinkContainer>
                  </React.Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <NotificationDrawer />
            {!(this.props.watchPage || !this.props.isAuthenticated) &&
              this.props.watchRunning && (
                <Alert bsStyle="info">
                  <h5>
                    {this.props.peopleCount > 0 && (
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
              <Route exact path="/" component={MainPage} />
              <Route
                exact
                path="/studentunions"
                component={StudentUnionsPage}
              />
              <Route exact path="/keys" component={KeysPage} />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/rules" component={RulesPage} />
              <Route exact path="/news" component={NewsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/session"
                component={Session}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/logout"
                component={LogoutPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                path="/user"
                component={UserProfilePage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/users"
                component={UserListPage}
              />
            </React.Fragment>
          </div>
        </div>
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
