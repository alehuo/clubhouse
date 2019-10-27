import { Rule } from "@alehuo/clubhouse-shared";
import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomOverlay from "./CustomOverlay";

interface Props {
  id: number;
  rule: Rule;
  editMode: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUpClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveDownClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const SingleRule: React.FC<Props> = ({
  id,
  rule,
  editMode,
  canMoveUp,
  onMoveUpClick,
  canMoveDown,
  onMoveDownClick,
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
          <CustomOverlay
            id="editSingleRule"
            text="Edit the currently selected rule."
          >
            <Button variant="success" size="sm">
              <FontAwesomeIcon icon="edit" /> Edit
            </Button>
          </CustomOverlay>
        </td>
        <td>
          <CustomOverlay
            id="moveRuleUp"
            text="Move the currently selected rule up in the list."
          >
            <Button
              variant="info"
              size="sm"
              disabled={canMoveUp}
              onClick={onMoveUpClick}
            >
              <FontAwesomeIcon icon="arrow-up" /> Move up
            </Button>
          </CustomOverlay>
        </td>
        <td>
          <CustomOverlay
            id="moveRuleDown"
            text="Move the currently selected rule down in the list."
          >
            <Button
              variant="info"
              size="sm"
              disabled={canMoveDown}
              onClick={onMoveDownClick}
            >
              <FontAwesomeIcon icon="arrow-down" /> Move down
            </Button>
          </CustomOverlay>
        </td>
        <td>
          <CustomOverlay
            id="deleteSingleRule"
            text="Delete the currently selected rule."
          >
            <Button variant="danger" size="sm">
              <FontAwesomeIcon icon="trash-alt" /> Delete
            </Button>
          </CustomOverlay>
        </td>
      </React.Fragment>
    )}
  </tr>
);
