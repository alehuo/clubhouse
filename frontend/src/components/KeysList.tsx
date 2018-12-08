import React from "react";
import { Table } from "react-bootstrap";

interface Key {
  id: number;
  name: string;
  studentUnion: string;
  date: Date;
  keyDesc: string;
}

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
        <th>Date assigned</th>
        <th>Key type</th>
      </tr>
    </thead>
    <tbody>
      {keys ? (
        keys.map((key) => (
          <tr key={key.id}>
            <td>{key.id}</td>
            <td>{key.name}</td>
            <td>{key.studentUnion}</td>
            <td>{key.date.toLocaleString()}</td>
            <td>{key.keyDesc}</td>
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
