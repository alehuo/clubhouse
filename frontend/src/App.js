import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>Clubhouse management</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}>News</NavItem>
              <NavItem eventKey={2}>Calendar</NavItem>
              <NavItem eventKey={3}>Keys</NavItem>
              <NavItem eventKey={4}>Rules</NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={5} title="test" id="basic-nav-dropdown">
                <MenuItem eventKey={5.1}>My profile</MenuItem>
                <MenuItem eventKey={5.2}>Settings</MenuItem>
              </NavDropdown>
              <NavItem eventKey={6}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
            <Route path="/rules" component={() => <div>Rules</div>} />
            <Route path="/news" component={() => <div>News</div>} />
            <Route path="/login" component={() => <div>Login</div>} />
            <Route path="/logout" component={() => <div>Logout</div>} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
