import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";

export class Session extends Component {
  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1>Current session</h1>
          <p>
            Elapsed time: <b>2 hours, 26 minutes, 20 seconds</b>
          </p>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
