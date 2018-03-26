import React, { Component } from "react";
import { connect } from "react-redux";

export class MainPage extends Component {
  render() {
    return <div>Main page</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
