import React from "react";
import { Col, Nav, NavItem, PageHeader, Row } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect, Route } from "react-router-dom";
import UserHistory from "./subpages/UserHistory";
import UserInformation from "./subpages/UserInformation";
import UserKeys from "./subpages/UserKeys";

const UserProfilePage: React.SFC<any> = (props) => {
  return (
    <React.Fragment>
      <PageHeader>
        {(props.userData.firstName || "") +
          " " +
          (props.userData.lastName || "")}{" "}
        <small>{props.userData.email || ""}</small>
      </PageHeader>
      <Row className="clearfix">
        <Col xs={3}>
          <Nav bsStyle="pills" stacked>
            <LinkContainer to="/user/info">
              <NavItem>
                <FontAwesome name="user" /> My information
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/user/history">
              <NavItem>
                <FontAwesome name="clock" /> My history
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/user/keys">
              <NavItem>
                <FontAwesome name="key" /> My keys
              </NavItem>
            </LinkContainer>
          </Nav>
        </Col>
        <Col xs={9}>
          <Route
            exact
            path="/user"
            component={() => <Redirect to="/user/info" />}
          />
          <Route
            exact
            path="/user/info"
            render={() => <UserInformation userData={props.userData} />}
          />
          <Route exact path="/user/history" component={UserHistory} />
          <Route exact path="/user/keys" component={UserKeys} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  perms: state.permission.userPerms,
  userData: state.user.userData,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);
