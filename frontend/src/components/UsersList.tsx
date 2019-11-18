import { Permission, User } from '@alehuo/clubhouse-shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../reduxStore';
import { deleteUser, fetchUsers } from './../reducers/actions/userActions';
import PermissionUtils from './../utils/PermissionUtils';

interface Props {
    token: string;
    fetchUsers: any;
    perms: number;
    users: User[];
    deleteUser: any;
}

export class UsersList extends React.Component<Props> {
    public componentDidMount() {
        this.props.fetchUsers(this.props.token);
    }
    public render() {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        {PermissionUtils.hasPermission(this.props.perms, Permission.ALLOW_REMOVE_USER) && (
                            <th>Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {this.props.users ? (
                        this.props.users.map((user: any) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>
                                    {user.firstName} {user.lastName}
                                </td>
                                <td>{user.email}</td>
                                {PermissionUtils.hasPermission(this.props.perms, Permission.ALLOW_REMOVE_USER) && (
                                    <td>
                                        {PermissionUtils.hasPermission(
                                            this.props.perms,
                                            Permission.ALLOW_REMOVE_USER,
                                        ) && (
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'Do you want to delete this user?' +
                                                                ' Deleting a user will delete ALL messages and watch history.',
                                                        )
                                                    ) {
                                                        this.props.deleteUser(user.userId, this.props.token);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon="trash" /> Delete
                                            </Button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No users.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.user.token,
    perms: state.user.userPerms,
});

const mapDispatchToProps = {
    fetchUsers,
    deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
