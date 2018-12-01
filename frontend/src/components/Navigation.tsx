import React from "react";
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";

interface NavButton {
  url: string;
  icon: string;
  text: string;
}

interface NavigationProps {
  navButtons: NavButton[];
  isAuthenticated: boolean;
  userData: {
    email: string;
  };
}

const Navigation: React.SFC<NavigationProps> = ({
  navButtons,
  isAuthenticated,
  userData,
}) => (
  <Navbar inverse collapseOnSelect fixedTop>
    <Navbar.Header>
      <LinkContainer to="/">
        <Navbar.Brand>Clubhouse management</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        {isAuthenticated && (
          <NavDropdown title={"Menu"} id="1">
            {navButtons.map((navButton) => (
              <LinkContainer to={navButton.url} key={navButton.url}>
                <NavItem eventKey={1}>
                  <FontAwesome name={navButton.icon} /> {navButton.text}
                </NavItem>
              </LinkContainer>
            ))}
          </NavDropdown>
        )}
      </Nav>
      <Nav pullRight>
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
                  <span>{userData.email || ""}</span>
                </React.Fragment>
              }
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/user/info">
                <MenuItem eventKey={6.1}>
                  <FontAwesome name="user" /> My information
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/user/history">
                <MenuItem eventKey={6.2}>
                  <FontAwesome name="history" /> My history
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/user/keys">
                <MenuItem eventKey={6.3}>
                  <FontAwesome name="key" /> My keys
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/logout">
                <MenuItem eventKey={6.4}>
                  <FontAwesome name="sign-out-alt" /> Logout
                </MenuItem>
              </LinkContainer>
            </NavDropdown>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <LinkContainer to="/login">
              <NavItem eventKey={6}>
                <FontAwesome name="sign-out-alt" /> Login
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/register">
              <NavItem eventKey={6}>
                <FontAwesome name="sign-in-alt" /> Register
              </NavItem>
            </LinkContainer>
          </React.Fragment>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export { Navigation };
