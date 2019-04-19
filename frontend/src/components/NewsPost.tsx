import { Newspost } from "@alehuo/clubhouse-shared";
import moment from "moment";
import React from "react";
import { Button, Card } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

interface Props {
  date?: string;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
  <Card style={{ marginTop: 5, marginBottom: 5 }}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        By #<strong>{author}</strong> on{" "}
        <i>{date ? moment(date).format("LLL") : "N/A"}</i>
      </Card.Subtitle>
      <Card.Text>{message}</Card.Text>
      {hasEditDeletePermissions && (
        <Card.Text>
          <Button variant="danger" onClick={onDelete}>
            <FontAwesome name="trash" /> Delete
          </Button>
          {"   "}
          <Button variant="success" onClick={onEdit}>
            <FontAwesome name="edit" /> Edit
          </Button>
        </Card.Text>
      )}
    </Card.Body>
  </Card>
);

export default NewsPost;
