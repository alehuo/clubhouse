import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { deleteStudentUnion } from './../reducers/actions/studentUnionActions';
import PermissionUtils from './../utils/PermissionUtils';

import { Permission, StudentUnion } from '@alehuo/clubhouse-shared';
import { RootState } from '../reduxStore';
import { Table, TableRow, TableBody, TableCell, TableHead, Button } from '@material-ui/core';

interface Props {
    perms: number;
    stdus: StudentUnion[];
    deleteStdu: any;
    token: string | null;
}

const StudentUnionsList: React.FC<Props> = ({ perms, stdus, deleteStdu, token }) => (
    <Table>
        <TableHead>
            <TableRow>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                {PermissionUtils.hasPermission(perms, Permission.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS) && (
                    <th>Actions</th>
                )}
            </TableRow>
        </TableHead>
        <TableBody>
            {stdus ? (
                stdus.map(union => (
                    <TableRow key={union.unionId}>
                        <TableCell>{union.unionId}</TableCell>
                        <TableCell>{union.name}</TableCell>
                        <TableCell>{union.description}</TableCell>
                        {PermissionUtils.hasPermission(perms, Permission.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS) && (
                            <TableCell>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        if (window.confirm('Do you want to really delete the student union?')) {
                                            deleteStdu(union.unionId, token);
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon="trash" /> Delete
                                </Button>
                            </TableCell>
                        )}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={3}>No student unions.</TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
);

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
    perms: state.user.userPerms,
});

const mapDispatchToProps = {
    deleteStdu: deleteStudentUnion,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentUnionsList);
