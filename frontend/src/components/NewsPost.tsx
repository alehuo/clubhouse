import moment from "moment";
import React from "react";
import { Button, Panel } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

interface Props {
  title: string;
  message: string;
  author: number;
  date?: string;
  onDelete: any;
  onEdit: any;
  hasEditDeletePermissions: boolean;
}

const NewsPost: React.SFC<Props> = ({
  title,
  message,
  author,
  date,
  onDelete,
  onEdit,
  hasEditDeletePermissions,
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
      By #<strong>{author}</strong> on{" "}
      <i>{date ? moment(date).format("LLL") : "N/A"}</i>
    </Panel.Footer>
  </Panel>
);

export default NewsPost;
