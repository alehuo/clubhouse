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
import { connect } from "react-redux";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return props.isAuthenticated ? (
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
            <React.Fragment>
              <Route exact path="/" component={MainPage} />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                exact
                path="/studentunions"
                component={StudentUnionsPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                exact
                path="/keys"
                component={KeysPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                path="/users"
                component={() => <div>Users</div>}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                path="/calendar"
                component={CalendarPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                path="/rules"
                component={() => <div>Rules</div>}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                path="/news"
                component={NewsPage}
              />
              <Route exact path="/login" component={LoginPage} />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                exact
                path="/logout"
                component={LogoutPage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
                exact
                path="/profile"
                component={UserProfilePage}
              />
              <AuthenticatedRoute
                isAuthenticated={this.props.isAuthenticated}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
