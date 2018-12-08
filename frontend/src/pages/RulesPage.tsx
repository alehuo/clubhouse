import React from "react";
import { Alert, Button, PageHeader, Table } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions } from "@alehuo/clubhouse-shared";
import { Rule } from "../components/Rule";
import { RootState } from "../reduxStore";
import { Rule as RuleModel } from "../services/RuleService";
import {
  fetchRules,
  moveRuleDown,
  moveRuleUp,
  toggleEditMode,
} from "./../reducers/ruleReducer";

interface Props {
  editMode: boolean;
  fetchRules: any;
  toggleEditMode: any;
  perms: number;
  rules: RuleModel[];
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
        <PageHeader>Rules</PageHeader>
        <p>
          <Button
            bsStyle={!this.props.editMode ? "success" : "danger"}
            onClick={() => this.props.toggleEditMode()}
          >
            {!this.props.editMode ? (
              <React.Fragment>
                <FontAwesome name="lock" /> Edit
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FontAwesome name="lock-open" /> Finish editing
              </React.Fragment>
            )}
          </Button>
        </p>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permissions.ALLOW_VIEW_RULES.value,
        ) ? (
          this.props.rules && (
            <Table responsive striped>
              <tbody>
                {this.props.rules.map((rule: any, i: number) => (
                  <Rule
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
          )
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view rules</h4>
            <p>You don't have correct permissions to view rules.</p>
          </Alert>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  perms: state.permission.userPerms,
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
