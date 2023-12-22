import React from 'react';
import { connect } from 'react-redux';
import UsersList from './../components/UsersList';
import PermissionUtils from './../utils/PermissionUtils';
import { Permission, User } from '@alehuo/clubhouse-shared';
import { RootState } from '../reduxStore';

interface Props {
    perms: number;
    users: User[];
}

export class UserListPage extends React.Component<Props> {
    public render() {
        return (
            <React.Fragment>
                <div>
                    <div>
                        <h1>Users</h1>
                    </div>
                </div>
                {PermissionUtils.hasPermission(this.props.perms, Permission.ALLOW_VIEW_USERS) ? (
                    <UsersList users={this.props.users} />
                ) : (
                        <div>
                            You don&apos;t have correct permissions to view users.
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    studentUnions: state.studentUnion.studentUnions,
    perms: state.user.userPerms,
    users: state.user.users,
});

export default connect(mapStateToProps)(UserListPage);
