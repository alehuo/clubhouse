import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button } from "react-bootstrap";
import KeysList from "./../components/KeysList";
import FontAwesome from "react-fontawesome";
import { toggleModal } from "./../reducers/keyReducer";
import AddKeyHolder from "./subpages/AddKeyHolder";

export class KeysPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Keys
          <p>
            <Button
              bsStyle="success"
              onClick={() => this.props.toggleModal(true)}
            >
              <FontAwesome name="plus" /> Add a keyholder
            </Button>
            {"  "}
            <Button bsStyle="info">
              <FontAwesome name="envelope" /> Send an email to keyholder(s)
            </Button>
          </p>
        </PageHeader>
        <KeysList keys={this.props.keys} />
        <AddKeyHolder
          show={this.props.modalOpen}
          onHide={() => this.props.toggleModal(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.key.keys,
  modalOpen: state.key.modalOpen
});

const mapDispatchToProps = {
  toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(KeysPage);
