import { Key } from "@alehuo/clubhouse-shared";
import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";

interface Props {
  keys: Key[];
}

const KeyList: React.SFC<Props> = ({ keys }) => (
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
      {keys ? (
        keys.map((key) => (
          <tr key={key.keyId}>
            <td>{key.keyId}</td>
            <td>#{key.userId}</td>
            <td>#{key.unionId}</td>
            <td>#{key.keyType}</td>
            <td>{key.description === "" ? "-" : key.description}</td>
            <td>{moment(key.dateAssigned).toISOString()}</td>
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
