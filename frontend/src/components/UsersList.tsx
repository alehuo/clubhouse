import { Permission, User } from '@alehuo/clubhouse-shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reduxStore';
import { deleteUser, fetchUsers } from './../reducers/actions/userActions';
import PermissionUtils from './../utils/PermissionUtils';
import { Table, TableHead, TableCell, TableRow, TableBody, Button } from '@material-ui/core';

interface Props {
    token: string | null;
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        {PermissionUtils.hasPermission(this.props.perms, Permission.ALLOW_REMOVE_USER) && (
                            <TableCell>Actions</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.users ? (
                        this.props.users.map((user: any) => (
                            <TableRow key={user.userId}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>
                                    {user.firstName} {user.lastName}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                {PermissionUtils.hasPermission(this.props.perms, Permission.ALLOW_REMOVE_USER) && (
                                    <TableCell>
                                        {PermissionUtils.hasPermission(
                                            this.props.perms,
                                            Permission.ALLOW_REMOVE_USER,
                                        ) && (
                                            <Button
                                                variant="text"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'Do you want to delete this user?' +
                                                                ' Deleting a user will delete ALL messages and watch history.',
                                                        )
                                                    ) {
                                                        this.props.deleteUser(user.userId);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon="trash" /> Delete
                                            </Button>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>No users.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
    perms: state.user.userPerms,
});

const mapDispatchToProps = {
    fetchUsers,
    deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
