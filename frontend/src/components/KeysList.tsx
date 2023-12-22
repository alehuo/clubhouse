import { Key, KeyType, StudentUnion, User } from '@alehuo/clubhouse-shared';
import { Avatar, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

interface Props {
    keys: Key[];
    users: User[];
    studentUnions: StudentUnion[];
    keyTypes: KeyType[];
}

const KeyList: React.FC<Props> = ({ keys, studentUnions, keyTypes, users }) => (
    <Paper>
        <Table>
            <TableHead>
                <TableCell>{''}</TableCell>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Student union</TableCell>
                <TableCell>Key type</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Date assigned</TableCell>
            </TableHead>
            <TableBody>
                {keys && keys.length > 0 ? (
                    keys.map(key => (
                        <TableRow key={key.keyId}>
                            <TableCell>
                                <Avatar>
                                    {users
                                        .filter(user => user.userId === key.userId)
                                        .map(user => user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase())}
                                </Avatar>
                            </TableCell>
                            <TableCell>{key.keyId}</TableCell>
                            <TableCell>
                                {users
                                    .filter(user => user.userId === key.userId)
                                    .map(user => user.firstName + ' ' + user.lastName)}
                            </TableCell>
                            <TableCell>
                                {studentUnions.filter(stdu => stdu.unionId === key.unionId).map(stdu => stdu.name)}
                            </TableCell>
                            <TableCell>
                                {keyTypes
                                    .filter(keyType => keyType.keyTypeId === key.keyType)
                                    .map(keyType => keyType.title)}
                            </TableCell>
                            <TableCell>{key.description === '' ? '-' : key.description}</TableCell>
                            <TableCell>{moment(key.dateAssigned).format('DD.MM.YYYY HH:mm')}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5}>No keys.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Paper>
);

export default KeyList;
