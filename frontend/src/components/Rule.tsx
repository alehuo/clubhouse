import React from "react";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { Rule as RuleType } from "../services/RuleService";
import CustomOverlay from "./CustomOverlay";

interface Props {
  id: number;
  rule: RuleType;
  editMode: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUpClick: any;
  onMoveDownClick: any;
}

export const Rule: React.SFC<Props> = ({
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
            <Button bsStyle="success" bsSize="small">
              <FontAwesome name="edit" /> Edit
            </Button>
            </CustomOverlay>
        </td>
        <td>
        <CustomOverlay
            id="moveRuleUp"
            text="Move the currently selected rule up in the list."
          >
            <Button
              bsStyle="info"
              bsSize="small"
              disabled={canMoveUp}
              onClick={onMoveUpClick}
            >
              <FontAwesome name="arrow-up" /> Move up
            </Button>
          </CustomOverlay>
        </td>
        <td>
          <CustomOverlay
            id="moveRuleDown"
            text="Move the currently selected rule down in the list."
          >
            <Button
              bsStyle="info"
              bsSize="small"
              disabled={canMoveDown}
              onClick={onMoveDownClick}
            >
              <FontAwesome name="arrow-down" /> Move down
            </Button>
          </CustomOverlay>
        </td>
        <td>
          <CustomOverlay
            id="deleteSingleRule"
            text="Delete the currently selected rule."
          >
            <Button bsStyle="danger" bsSize="small">
              <FontAwesome name="trash-alt" /> Delete
            </Button>
          </CustomOverlay>
        </td>
      </React.Fragment>
    )}
  </tr>
);
