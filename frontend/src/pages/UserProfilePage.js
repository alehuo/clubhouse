import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { PageHeader, Row, Col, NavItem, Nav } from "react-bootstrap";
import UserKeys from "./subpages/UserKeys";
import UserHistory from "./subpages/UserHistory";
import UserInformation from "./subpages/UserInformation";
import { LinkContainer } from "react-router-bootstrap";
export class UserProfilePage extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <React.Fragment>
        <PageHeader>
          John Doe <small>email@example.com</small>
        </PageHeader>
        <Row className="clearfix">
          <Col xs={3}>
            <Nav bsStyle="pills" stacked>
              <LinkContainer to="/user/info" eventKey="first">
                <NavItem>My information</NavItem>
              </LinkContainer>
              <LinkContainer to="/user/history" eventKey="first">
                <NavItem>My history</NavItem>
              </LinkContainer>
              <LinkContainer to="/user/keys" eventKey="first">
                <NavItem>My keys</NavItem>
              </LinkContainer>
            </Nav>
          </Col>
          <Col xs={9}>
            <Route
              exact
              path="/user"
              component={() => <Redirect to="/user/info" />}
            />
            <Route exact path="/user/info" component={UserInformation} />
            <Route exact path="/user/history" component={UserHistory} />
            <Route exact path="/user/keys" component={UserKeys} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
