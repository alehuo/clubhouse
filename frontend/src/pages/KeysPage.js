import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button } from "react-bootstrap";
import KeysList from "./../components/KeysList";
import FontAwesome from "react-fontawesome";

export class KeysPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Keys
          <p>
            <Button bsStyle="success">
              <FontAwesome name="plus" /> Add a keyholder
            </Button>
            {"  "}
            <Button bsStyle="info">
              <FontAwesome name="envelope" /> Send an email to keyholder(s)
            </Button>
          </p>
        </PageHeader>
        <KeysList keys={this.props.keys} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.key.keys
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(KeysPage);
