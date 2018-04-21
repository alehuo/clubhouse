import React, { Component } from "react";
import "./App.css";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Button,
  Alert
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NewsPage from "./pages/NewsPage";
import KeysPage from "./pages/KeysPage";
import RulesPage from "./pages/RulesPage";
import UserProfilePage from "./pages/UserProfilePage";
import StudentUnionsPage from "./pages/StudentUnionsPage";
import FontAwesome from "react-fontawesome";
import CalendarPage from "./pages/CalendarPage";
import NotificationDrawer from "./components/NotificationDrawer";
import { connect } from "react-redux";
import { authenticateUser } from "./reducers/authenticationReducer";
import { getUserPerms } from "./reducers/permissionReducer";
import { setToken } from "./reducers/userReducer";
import { LinkContainer } from "react-router-bootstrap";
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
    }
  };

  isUserLoggedIn = () => this.props.isAuthenticated === true;

  render() {
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
                <LinkContainer to="/news">
                  <NavItem eventKey={1}>
                    <FontAwesome name="comments" /> News
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/calendar">
                  <NavItem eventKey={2}>
                    <FontAwesome name="calendar" /> Calendar
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/keys">
                  <NavItem eventKey={3}>
                    <FontAwesome name="key" /> Keys
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/studentunions">
                  <NavItem eventKey={4}>
                    <FontAwesome name="users" /> Student unions
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/rules">
                  <NavItem eventKey={5}>
                    <FontAwesome name="list-ol" /> Rules
                  </NavItem>
                </LinkContainer>
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
            <Alert bsStyle="info">
              <h5>
                You are currently in an ongoing session with <b>X</b> other
                person(s).&nbsp;&nbsp;&nbsp;&nbsp;
                <LinkContainer to="/session">
                  <Button bsStyle="primary">View current session</Button>
                </LinkContainer>
              </h5>
            </Alert>
            <React.Fragment>
              <Route exact path="/" component={MainPage} />
              <Route
                exact
                path="/studentunions"
                component={StudentUnionsPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                path="/users"
                component={() => <div>Users</div>}
              />
              <Route exact path="/keys" component={KeysPage} />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/rules" component={RulesPage} />
              <Route exact path="/news" component={NewsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/session" component={Session} />
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
            </React.Fragment>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  authenticateUser,
  getUserPerms,
  setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
