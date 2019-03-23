import { Newspost } from "@alehuo/clubhouse-shared";
import moment from "moment";
import React from "react";
import { Button, Card } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

interface Props {
  date?: string;
  onDelete: any;
  onEdit: any;
  hasEditDeletePermissions: boolean;
}

const NewsPost: React.SFC<
  Pick<Newspost, "title" | "author" | "message"> & Props
> = ({
  title,
  message,
  author,
  date,
  onDelete,
  onEdit,
  hasEditDeletePermissions,
}) => (
  <Card bg="primary">
    <Card.Header>
      <Card.Title>
        <b>{title}</b>
        {hasEditDeletePermissions && (
          <React.Fragment>
            {"   "}
            <Button variant="danger" onClick={onDelete}>
              <FontAwesome name="trash" /> Delete
            </Button>
            {"   "}
            <Button variant="success" onClick={onEdit}>
              <FontAwesome name="edit" /> Edit
            </Button>
          </React.Fragment>
        )}
      </Card.Title>
    </Card.Header>
    <Card.Body>{message}</Card.Body>
    <Card.Footer>
      By #<strong>{author}</strong> on{" "}
      <i>{date ? moment(date).format("LLL") : "N/A"}</i>
    </Card.Footer>
  </Card>
);

export default NewsPost;
