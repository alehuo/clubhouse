import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import UserService from "./services/UserService";
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
            <button
              onClick={async () => {
                console.log("Logging in");
                const loginRes = await UserService.login("admin", "admin");
                console.log(loginRes);
              }}
            >
              Login test
            </button>
            <button
              onClick={async () => {
                console.log("Registering");
                const registerRes = await UserService.register({
                  username: "admin",
                  password: "admin"
                });
                console.log(registerRes);
              }}
            >
              Register test
            </button>
            <React.Fragment>
              <Route exact path="/" component={MainPage} />
              <Route
                exact
                path="/studentunions"
                component={StudentUnionsPage}
              />
              <Route exact path="/keys" component={KeysPage} />
              <Route exact path="/users" component={() => <div>Users</div>} />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/rules" component={() => <div>Rules</div>} />
              <Route exact path="/news" component={NewsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path="/profile" component={UserProfilePage} />
              <Route
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

export default App;
