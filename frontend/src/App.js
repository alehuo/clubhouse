import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NewsPage from "./pages/NewsPage";
import KeysPage from "./pages/KeysPage";
import UserProfilePage from "./pages/UserProfilePage";
import StudentUnionsPage from "./pages/StudentUnionsPage";
import FontAwesome from "react-fontawesome";
import CalendarPage from "./pages/CalendarPage";
import { Link } from "react-router-dom";
import NotificationDrawer from "./components/NotificationDrawer";
import { connect } from "react-redux";
import { authenticateUser } from "./reducers/authenticationReducer";

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
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
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
              <Navbar.Brand>
                <Link to="/">Clubhouse management</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}>
                  <Link to="/news">
                    <FontAwesome name="comments" /> News
                  </Link>
                </NavItem>
                <NavItem eventKey={2}>
                  <Link to="/calendar">
                    <FontAwesome name="calendar" /> Calendar
                  </Link>
                </NavItem>
                <NavItem eventKey={3}>
                  <Link to="/keys">
                    <FontAwesome name="key" /> Keys
                  </Link>
                </NavItem>
                <NavItem eventKey={4}>
                  <Link to="/rules">
                    <FontAwesome name="list-ol" /> Rules
                  </Link>
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavDropdown
                  eventKey={5}
                  title={
                    <React.Fragment>
                      <FontAwesome name="user" /> <span>user</span>
                    </React.Fragment>
                  }
                  id="basic-nav-dropdown"
                >
                  <MenuItem eventKey={5.1}>
                    <Link to="/profile">
                      <FontAwesome name="user" /> My profile
                    </Link>
                  </MenuItem>
                  <MenuItem eventKey={5.2}>
                    <Link to="/profile/settings">
                      <FontAwesome name="cog" /> Settings
                    </Link>
                  </MenuItem>
                </NavDropdown>
                <NavItem eventKey={6}>
                  <Link to="/logout">
                    <FontAwesome name="sign-out-alt" /> Logout
                  </Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container">
            <NotificationDrawer />
            <React.Fragment>
              <Route exact path="/" component={MainPage} />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/studentunions"
                component={StudentUnionsPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/keys"
                component={KeysPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                path="/users"
                component={() => <div>Users</div>}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                path="/calendar"
                component={CalendarPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                path="/rules"
                component={() => <div>Rules</div>}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                path="/news"
                component={NewsPage}
              />
              <Route exact path="/login" component={LoginPage} />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/logout"
                component={LogoutPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/profile"
                component={UserProfilePage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.isUserLoggedIn()}
                exact
                path="/profile/settings"
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
  authenticateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
