import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NewsPage from "./pages/NewsPage";
import KeysPage from "./pages/KeysPage";
import RulesPage from "./pages/RulesPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserListPage from "./pages/UserListPage";
import StudentUnionsPage from "./pages/StudentUnionsPage";
import FontAwesome from "react-fontawesome";
import CalendarPage from "./pages/CalendarPage";
import NotificationDrawer from "./components/NotificationDrawer";
import { connect } from "react-redux";
import { authenticateUser } from "./reducers/authenticationReducer";
import { getUserPerms } from "./reducers/permissionReducer";
import { setToken } from "./reducers/userReducer";
import { LinkContainer } from "react-router-bootstrap";
import {
  fetchOwnWatchStatus,
  setWatchCheckInterval
} from "./reducers/watchReducer";
import Session from "./pages/Session";

const AuthenticatedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);
class App extends Component {
  componentWillMount = () => {
    if (localStorage.getItem("token")) {
      this.props.setToken(localStorage.getItem("token"));
      this.props.getUserPerms(localStorage.getItem("token"));
      this.props.authenticateUser();
      const watchInterval = setInterval(() => {
        this.props.fetchOwnWatchStatus(localStorage.getItem("token"));
      }, 10000);
      this.props.setWatchCheckInterval(watchInterval);
    }
  };

  componentWillUnmount() {
    clearInterval(this.props.watchInterval);
    this.props.setWatchCheckInterval(null);
  }

  isUserLoggedIn = () => this.props.isAuthenticated === true;

  render() {
    const navButtons = [
      {
        url: "/news",
        icon: "comments",
        text: "News"
      },
      /*{
        url: "/calendar",
        icon: "calendar",
        text: "Calendar"
      },
      {
        url: "/keys",
        icon: "key",
        text: "Keys"
      },*/
      {
        url: "/studentunions",
        icon: "users",
        text: "Student unions"
      },
      /*{
        url: "/rules",
        icon: "list-ol",
        text: "Rules"
      },*/
      {
        url: "/users",
        icon: "users",
        text: "Users"
      }
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
                  <React.Fragment>
                    {navButtons.map(navButton => (
                      <LinkContainer to={navButton.url} key={navButton.url}>
                        <NavItem eventKey={1}>
                          <FontAwesome name={navButton.icon} /> {navButton.text}
                        </NavItem>
                      </LinkContainer>
                    ))}
                  </React.Fragment>
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
                          <FontAwesome name="user" /> <span>John Doe</span>
                        </React.Fragment>
                      }
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/user">
                        <MenuItem eventKey={6.1}>
                          <FontAwesome name="user" /> My profile
                        </MenuItem>
                      </LinkContainer>
                    </NavDropdown>
                    <LinkContainer to="/logout">
                      <NavItem eventKey={6}>
                        <FontAwesome name="sign-out-alt" /> Logout
                      </NavItem>
                    </LinkContainer>
                  </React.Fragment>
                ) : (
                  <LinkContainer to="/login">
                    <NavItem eventKey={6}>
                      <FontAwesome name="sign-out-alt" /> Login
                    </NavItem>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <NotificationDrawer />
            {/*!(this.props.watchPage || !this.props.isAuthenticated) &&
              this.props.watchRunning && (
                <Alert bsStyle="info">
                  <h5>
                    {this.props.peopleCount > 0 ? (
                      <React.Fragment>
                        You are currently in an ongoing session with{" "}
                        <b>{this.props.peopleCount}</b> other
                        person(s).&nbsp;&nbsp;&nbsp;&nbsp;
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        You are currently alone in an ongoing
                        session.&nbsp;&nbsp;&nbsp;&nbsp;
                      </React.Fragment>
                    )}

                    <LinkContainer to="/session">
                      <Button bsStyle="primary">View current session</Button>
                    </LinkContainer>
                  </h5>
                </Alert>
              )*/}
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  watchPage: state.watch.watchPage,
  watchRunning: state.watch.ownWatchRunning,
  peopleCount: state.watch.ownWatchPeopleCount,
  watchInterval: state.watch.watchCheckInterval
});

const mapDispatchToProps = {
  authenticateUser,
  getUserPerms,
  setToken,
  fetchOwnWatchStatus,
  setWatchCheckInterval
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
