import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import StudentUnionsList from './../components/StudentUnionsList';
import { addFormModalOpen, fetchStudentUnions } from './../reducers/actions/studentUnionActions';
import PermissionUtils from './../utils/PermissionUtils';
import AddStudentUnion from './subpages/AddStudentUnion';
import { Permission, StudentUnion } from '@alehuo/clubhouse-shared';
import { RootState } from '../reduxStore';
import { Button } from '@material-ui/core';

interface Props {
    token: string | null;
    fetchStudentUnions: any;
    perms: number;
    addFormModalOpen: any;
    studentUnions: StudentUnion[];
    modalOpen: boolean;
}

export class StudentUnionsPage extends React.Component<Props> {
    public componentDidMount() {
        if (this.props.token !== '') {
            this.props.fetchStudentUnions(this.props.token);
        }
    }
    public render() {
        if (!this.props.token) {
            return <div />;
        }
        return (
            <React.Fragment>
                <div>
                    <div>
                        <h1>Student unions</h1>
                        <p>
                            {PermissionUtils.hasPermission(
                                this.props.perms,
                                Permission.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS,
                            ) && (
                                    <Button variant="text" onClick={() => this.props.addFormModalOpen(true)}>
                                        <FontAwesomeIcon icon="plus" /> Add a student union
                                    </Button>
                                )}
                        </p>
                    </div>
                </div>
                {PermissionUtils.hasPermission(this.props.perms, Permission.ALLOW_VIEW_STUDENT_UNIONS) ? (
                    <StudentUnionsList stdus={this.props.studentUnions} />
                ) : (
                        <div>You don&apos;t have correct permissions to view student unions.</div>
                    )}
                <AddStudentUnion show={this.props.modalOpen} onHide={() => this.props.addFormModalOpen(false)} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    studentUnions: state.studentUnion.studentUnions,
    modalOpen: state.studentUnion.modalOpen,
    perms: state.user.userPerms,
    token: state.auth.token,
});

const mapDispatchToProps = { addFormModalOpen, fetchStudentUnions };

export default connect(mapStateToProps, mapDispatchToProps)(StudentUnionsPage);
