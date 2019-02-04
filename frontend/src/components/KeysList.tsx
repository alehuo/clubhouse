import { Key, KeyType, StudentUnion, User } from "@alehuo/clubhouse-shared";
import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";

interface Props {
  keys: Key[];
  users: User[];
  studentUnions: StudentUnion[];
  keyTypes: KeyType[];
}

const KeyList: React.SFC<Props> = ({
  keys,
  studentUnions,
  keyTypes,
  users,
}) => (
  <Table striped bordered condensed hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Student union</th>
        <th>Key type</th>
        <th>Notes</th>
        <th>Date assigned</th>
      </tr>
    </thead>
    <tbody>
      {(keys && keys.length > 0) ? (
        keys.map((key) => (
          <tr key={key.keyId}>
            <td>{key.keyId}</td>
            <td>
              {users
                .filter((user) => user.userId === key.userId)
                .map((user) => user.firstName + " " + user.lastName)}
            </td>
            <td>
              {studentUnions
                .filter((stdu) => stdu.unionId === key.unionId)
                .map((stdu) => stdu.name)}
            </td>
            <td>
              {keyTypes
                .filter((keyType) => keyType.keyTypeId === key.keyType)
                .map((keyType) => keyType.title)}
            </td>
            <td>{key.description === "" ? "-" : key.description}</td>
            <td>{moment(key.dateAssigned).format("DD.MM.YYYY HH:mm")}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>No keys.</td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default KeyList;
