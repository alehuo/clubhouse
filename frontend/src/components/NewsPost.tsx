import React from "react";
import { Button, Panel } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

const NewsPost: React.SFC<any> = ({
  title,
  message,
  author,
  date,
  onDelete,
  onEdit,
  hasEditDeletePermissions
}) => (
  <Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title>
        <b>{title}</b>
        {hasEditDeletePermissions && (
          <React.Fragment>
            {"   "}
            <Button bsStyle="danger" onClick={onDelete}>
              <FontAwesome name="trash" /> Delete
            </Button>
            {"   "}
            <Button bsStyle="success" onClick={onEdit}>
              <FontAwesome name="edit" /> Edit
            </Button>
          </React.Fragment>
        )}
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>{message}</Panel.Body>
    <Panel.Footer>
      By <strong>{author.name}</strong> on <i>{date}</i>
    </Panel.Footer>
  </Panel>
);

export default NewsPost;
