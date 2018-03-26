import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import FontAwesome from "react-fontawesome";
import { CalendarPage } from "./pages/CalendarPage";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>Clubhouse management</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}>
                <FontAwesome name="comments" /> News
              </NavItem>
              <NavItem eventKey={2}>
                <FontAwesome name="calendar" /> Calendar
              </NavItem>
              <NavItem eventKey={3}>
                <FontAwesome name="key" /> Keys
              </NavItem>
              <NavItem eventKey={4}>
                <FontAwesome name="list-ol" /> Rules
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
                  <FontAwesome name="user" /> My profile
                </MenuItem>
                <MenuItem eventKey={5.2}>
                  <FontAwesome name="cog" /> Settings
                </MenuItem>
              </NavDropdown>
              <NavItem eventKey={6}>
                <FontAwesome name="sign-out-alt" /> Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <Router>
            <React.Fragment>
              <Route exact path="/" component={MainPage} />
              <Route
                exact
                path="/studentunions"
                component={() => <div>Student unions</div>}
              />
              <Route
                path="/keyholders"
                component={() => <div>Key holders</div>}
              />
              <Route path="/users" component={() => <div>Users</div>} />
              <Route path="/calendar" component={CalendarPage} />
              <Route path="/rules" component={() => <div>Rules</div>} />
              <Route path="/news" component={() => <div>News</div>} />
              <Route path="/login" component={() => <div>Login</div>} />
              <Route path="/logout" component={() => <div>Logout</div>} />
            </React.Fragment>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
