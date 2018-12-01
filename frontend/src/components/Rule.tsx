import React from "react";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

export const Rule: React.SFC<any> = ({
  id,
  rule,
  editMode,
  canMoveUp,
  onMoveUpClick,
  canMoveDown,
  onMoveDownClick
}) => (
  <tr>
    <td>
      <strong>{id}</strong>
    </td>
    <td>
      <span>{rule.text}</span>
    </td>
    {editMode && (
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
            disabled={canMoveUp}
            onClick={onMoveUpClick}
          >
            <FontAwesome name="arrow-up" /> Move up
          </Button>
        </td>
        <td>
          <Button
            bsStyle="info"
            bsSize="small"
            disabled={canMoveDown}
            onClick={onMoveDownClick}
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
