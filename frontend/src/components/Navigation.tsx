import { User } from "@alehuo/clubhouse-shared";
import React from "react";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";
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
  <Navbar collapseOnSelect fixed="top">
    <LinkContainer to="/">
      <Navbar.Brand>Clubhouse management</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <NavDropdown title={"Menu"} id="1" onSelect={() => null}>
          {navButtons.map(
            (navButton) =>
              !(navButton.auth && !isAuthenticated) && (
                <LinkContainer to={navButton.url} key={navButton.url}>
                  <NavDropdown.Item eventKey={1}>
                    <FontAwesome name={navButton.icon} /> {navButton.text}
                  </NavDropdown.Item>
                </LinkContainer>
              ),
          )}
        </NavDropdown>
      </Nav>
      <Nav>
        {isAuthenticated ? (
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
                  <span>{userData && (userData.email || "")}</span>
                </React.Fragment>
              }
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/user/info">
                <NavDropdown.Item eventKey={6.1}>
                  <FontAwesome name="user" /> My information
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/user/history">
                <NavDropdown.Item eventKey={6.2}>
                  <FontAwesome name="history" /> My history
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/user/keys">
                <NavDropdown.Item eventKey={6.3}>
                  <FontAwesome name="key" /> My keys
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavDropdown.Item eventKey={6.4}>
                  <FontAwesome name="sign-out-alt" /> Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <LinkContainer to="/login">
              <Nav.Item>
                <FontAwesome name="sign-out-alt" /> Login
              </Nav.Item>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Item>
                <FontAwesome name="sign-in-alt" /> Register
              </Nav.Item>
            </LinkContainer>
          </React.Fragment>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export { Navigation };
