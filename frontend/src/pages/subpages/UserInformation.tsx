import { User } from "@alehuo/clubhouse-shared";
import React from "react";
import { Button, ListGroup } from "react-bootstrap";

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  created_at: string;
}

interface Props {
  userData?: User;
}

const UserInformation: React.FC<Props> = ({ userData }) => {
  if (!userData) {
    return <div>Failed to display user data</div>;
  }
  const { email, firstName, lastName, created_at } = userData;
  return (
    <React.Fragment>
      <h2>User information</h2>
      <ListGroup>
        <ListGroup.Item>
          <b>E-mail address</b>
          {"  "}
          {email}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Account owner</b>
          {"  "}
          {firstName} {lastName}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Account creation date</b>
          {"  "}
          {created_at}
        </ListGroup.Item>
      </ListGroup>
      <h2>Account removal</h2>
      <p>
        You can request the removal of your account by clicking this link. Your
        request will be reviewed by an administrator as soon as possible.{" "}
        <strong>
          Please note that account deletion is permanent and you have to create
          a new account in case you want to return to the service.
        </strong>
      </p>
      <p>
        <Button variant="danger">Request account removal</Button>
      </p>
      <hr />
      <h2>Download personal information</h2>
      <p>
        You can download your personal information that is stored on the server
        about you.
      </p>
      <p>
        You will be prompted with a zip-file that includes all of your personal
        information.
      </p>
      <ul>
        <li>
          <b>First name</b>, <b>Last name</b>, <b>Email-address</b>,{" "}
          <b>Account registration date</b> and <b>Account update date</b>
        </li>
        <li>
          <b>Keys assigned to you</b>
        </li>
        <li>
          <b>Messages sent by you</b>
        </li>
        <li>
          <b>Ongoing and old watches</b>
        </li>
        <li>
          <b>Calendar events created by you</b>
        </li>
        <li>
          <b>Newsposts created by you</b>
        </li>
      </ul>
      <p>
        <Button variant="success">Download personal information</Button>
      </p>
      <hr />
    </React.Fragment>
  );
};

export default UserInformation;
