import { User } from "@alehuo/clubhouse-shared";
import React from "react";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { NavButton } from "../navButtons";

interface NavigationProps {
  navButtons: NavButton[];
  isAuthenticated: boolean;
  userData?: User;
}

const Navigation: React.SFC<NavigationProps> = ({
  navButtons,
  isAuthenticated,
  userData,
}) => (
  <Navbar bg="light" expand="lg" collapseOnSelect fixed="top">
    <Navbar.Brand>Clubhouse management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <NavDropdown title="Menu" id="1" onSelect={() => null}>
          {navButtons.map(
            (navButton) =>
              !(navButton.auth && !isAuthenticated) && (
                <Link to={navButton.url} key={navButton.url}>
                  <NavDropdown.Item eventKey={1}>
                    <FontAwesome name={navButton.icon} /> {navButton.text}
                  </NavDropdown.Item>
                </Link>
              ),
          )}
        </NavDropdown>
      </Nav>
      <Nav>
        {isAuthenticated ? (
          <React.Fragment>
            <Link to="/session">
              <NavItem>
                <FontAwesome name="beer" />{" "}
                <span>
                  <b>Session</b>
                </span>
              </NavItem>
            </Link>
            <NavDropdown
              eventKey={6}
              title={
                <React.Fragment>
                  <FontAwesome name="user" />{" "}
                  <span>{userData && (userData.email || "")}</span>
                </React.Fragment>
              }
              id="basic-nav-dropdown"
            >
              <Link to="/user/info">
                <NavDropdown.Item eventKey={6.1}>
                  <FontAwesome name="user" /> My information
                </NavDropdown.Item>
              </Link>
              <Link to="/user/history">
                <NavDropdown.Item eventKey={6.2}>
                  <FontAwesome name="history" /> My history
                </NavDropdown.Item>
              </Link>
              <Link to="/user/keys">
                <NavDropdown.Item eventKey={6.3}>
                  <FontAwesome name="key" /> My keys
                </NavDropdown.Item>
              </Link>
              <Link to="/logout">
                <NavDropdown.Item eventKey={6.4}>
                  <FontAwesome name="sign-out-alt" /> Logout
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/login">
              <Nav.Item>
                <FontAwesome name="sign-out-alt" /> Login
              </Nav.Item>
            </Link>
            <Link to="/register">
              <Nav.Item>
                <FontAwesome name="sign-in-alt" /> Register
              </Nav.Item>
            </Link>
          </React.Fragment>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export { Navigation };
