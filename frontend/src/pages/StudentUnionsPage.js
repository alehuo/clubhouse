import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import StudentUnionsList from "./../components/StudentUnionsList";
import AddStudentUnion from "./subpages/AddStudentUnion";
import { addFormModalOpen } from "./../reducers/studentUnionReducer";

export class StudentUnionsPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          <h1>Student unions</h1>
          <p>
            <Button
              bsStyle="success"
              onClick={() => this.props.addFormModalOpen(true)}
            >
              <FontAwesome name="plus" /> Add a student union
            </Button>
          </p>
        </PageHeader>
        <StudentUnionsList stdus={this.props.studentUnions} />
        <AddStudentUnion
          show={this.props.modalOpen}
          onHide={() => this.props.addFormModalOpen(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentUnions: state.studentUnion.studentUnions,
  modalOpen: state.studentUnion.modalOpen
});

const mapDispatchToProps = { addFormModalOpen };

export default connect(mapStateToProps, mapDispatchToProps)(StudentUnionsPage);
