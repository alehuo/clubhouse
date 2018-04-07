import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Jumbotron } from "react-bootstrap";

export class StudentUnionsPage extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1>Student unions</h1>
          <p>Browse student unions registered at the service</p>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StudentUnionsPage);
