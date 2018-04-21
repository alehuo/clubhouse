import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fetchStudentUnions } from "./../reducers/studentUnionReducer";

export class StudentUnionsList extends Component {
  componentDidMount() {
    this.props.fetchStudentUnions(this.props.token);
  }
  render() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.stdus ? (
            this.props.stdus.map(key => (
              <tr key={key.unionId}>
                <td>{key.unionId}</td>
                <td>{key.name}</td>
                <td>{key.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No student unions.</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = {
  fetchStudentUnions
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentUnionsList);
