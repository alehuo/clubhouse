import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

export class RulesPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          <h1>Rules</h1>
          <p>
            <h5>
              Rules of the clubhouse you <b>must</b> follow!
            </h5>
          </p>
          <p>
            <Button bsStyle="success">
              <FontAwesome name="edit" /> Edit rules
            </Button>
          </p>
        </PageHeader>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RulesPage);
