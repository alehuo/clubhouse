import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

export class RulesPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1>Rules</h1>
          <p>
            Rules of the clubhouse you <b>must</b> follow!
          </p>
          <p>
            <Button bsStyle="success">
              <FontAwesome name="edit" /> Edit rules
            </Button>
          </p>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RulesPage);
