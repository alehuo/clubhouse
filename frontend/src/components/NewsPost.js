import React from "react";
import { Panel } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsPost = ({ title, message, author, date }) => {
  return (
    <Panel bsStyle="primary">
      <Panel.Heading>
        <Panel.Title><b>{title}</b></Panel.Title>
      </Panel.Heading>
      <Panel.Body>{message}</Panel.Body>
      <Panel.Footer>
        By <Link to={"/user/" + author.id}>{author.name}</Link> on <i>{date}</i>
      </Panel.Footer>
    </Panel>
  );
};

export default NewsPost;
