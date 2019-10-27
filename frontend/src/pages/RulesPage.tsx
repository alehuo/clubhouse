import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";

import { Permission, Rule } from "@alehuo/clubhouse-shared";
import CustomOverlay from "../components/CustomOverlay";
import { SingleRule } from "../components/SingleRule";
import { RootState } from "../reduxStore";
import {
  fetchRules,
  moveRuleDown,
  moveRuleUp,
  toggleEditMode,
} from "./../reducers/ruleReducer";
import PermissionUtils from "./../utils/PermissionUtils";

interface Props {
  editMode: boolean;
  fetchRules: any;
  toggleEditMode: any;
  perms: number;
  rules: Rule[];
  moveRuleUp: any;
  moveRuleDown: any;
}

export class RulesPage extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchRules();
  }
  public render() {
    return (
      <React.Fragment>
        <div>Rules</div>
        <p>
          {PermissionUtils.hasPermission(
            this.props.perms,
            Permission.ALLOW_ADD_EDIT_REMOVE_RULES,
          ) && (
            <React.Fragment>
              <CustomOverlay
                id="editRuleTooltip"
                text="Lock or unlock rule editing."
              >
                <Button
                  variant={!this.props.editMode ? "info" : "danger"}
                  onClick={() => this.props.toggleEditMode()}
                >
                  {!this.props.editMode ? (
                    <React.Fragment>
                      <FontAwesomeIcon icon="lock" /> Edit rules
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <FontAwesomeIcon icon="lock-open" /> Finish editing
                    </React.Fragment>
                  )}
                </Button>
              </CustomOverlay>
              {"  "}
              <CustomOverlay id="addRuleTooltip" text="Add a new rule.">
                <Button onClick={() => console.log("Todo")} variant="success">
                  <FontAwesomeIcon icon="plus" /> Add new rule
                </Button>
              </CustomOverlay>
            </React.Fragment>
          )}
        </p>
        {this.props.rules && (
          <Table responsive striped>
            <tbody>
              {this.props.rules.map((rule: any, i: number) => (
                <SingleRule
                  id={i + 1}
                  key={i}
                  rule={rule}
                  canMoveUp={i === 0}
                  canMoveDown={i === this.props.rules.length - 1}
                  onMoveUpClick={() => this.props.moveRuleUp(rule.id)}
                  onMoveDownClick={() => this.props.moveRuleDown(rule.id)}
                  editMode={this.props.editMode}
                />
              ))}
            </tbody>
          </Table>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  perms: state.user.userPerms,
  rules: state.rule.rules,
  editMode: state.rule.editMode,
});

const mapDispatchToProps = {
  fetchRules,
  moveRuleUp,
  moveRuleDown,
  toggleEditMode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesPage);
