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
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
    <Navbar.Brand><img src="icon_512x512.png" height={40}/> Clubhouse management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <NavDropdown title="Menu" id="1">
          {navButtons.map(
            (navButton) =>
              !(navButton.auth && !isAuthenticated) && (
                <LinkContainer to={navButton.url} key={navButton.url}>
                  <NavDropdown.Item>
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
              <Nav.Link>
                <FontAwesome name="beer" /> <b>Session</b>
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={
                <React.Fragment>
                  <FontAwesome name="user" />{" "}
                  <span>{userData && (userData.email || "")}</span>
                </React.Fragment>
              }
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/user/info">
                <NavDropdown.Item>
                  <FontAwesome name="user" /> My information
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/user/history">
                <NavDropdown.Item>
                  <FontAwesome name="history" /> My history
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/user/keys">
                <NavDropdown.Item>
                  <FontAwesome name="key" /> My keys
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavDropdown.Item>
                  <FontAwesome name="sign-out-alt" /> Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <LinkContainer to="/login">
              <Nav.Link>
                <FontAwesome name="sign-out-alt" /> Login
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>
                <FontAwesome name="sign-in-alt" /> Register
              </Nav.Link>
            </LinkContainer>
          </React.Fragment>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export { Navigation };
