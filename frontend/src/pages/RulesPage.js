import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

export class RulesPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Rules
          <small>
            Rules of the clubhouse you <b>must</b> follow!
          </small>
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
