import React from "react";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

export const Rule = props => {
  return (
    <tr>
      <td>
        <strong>{props.id}</strong>
      </td>
      <td>
        <span>{props.rule.text}</span>
      </td>
      {props.editMode && (
        <React.Fragment>
          <td>
            <Button bsStyle="success" bsSize="small">
              <FontAwesome name="edit" /> Edit
            </Button>
          </td>
          <td>
            <Button
              bsStyle="info"
              bsSize="small"
              disabled={props.canMoveUp}
              onClick={props.onMoveUpClick}
            >
              <FontAwesome name="arrow-up" /> Move up
            </Button>
          </td>
          <td>
            <Button
              bsStyle="info"
              bsSize="small"
              disabled={props.canMoveDown}
              onClick={props.onMoveDownClick}
            >
              <FontAwesome name="arrow-down" /> Move down
            </Button>
          </td>
          <td>
            <Button bsStyle="danger" bsSize="small">
              <FontAwesome name="trash-alt" /> Delete
            </Button>
          </td>
        </React.Fragment>
      )}
    </tr>
  );
};
