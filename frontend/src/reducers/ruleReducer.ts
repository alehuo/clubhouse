import { isRule, Rule } from "@alehuo/clubhouse-shared";
import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import RuleService from "./../services/RuleService";
import { errorMessage } from "./actions/notificationActions";

export interface RuleState {
  readonly rules: Rule[];
  readonly editMode: boolean;
}

const initialState: RuleState = {
  rules: [],
  editMode: false,
};

export const ruleActions = {
  SET_RULES: "SET_RULES",
  MOVE_UP: "MOVE_UP",
  MOVE_DOWN: "MOVE_DOWN",
  TOGGLE_EDIT_MODE: "TOGGLE_EDIT_MODE",
  TOGGLE_SINGLE_RULE_EDIT_MODE: "TOGGLE_SINGLE_RULE_EDIT_MODE",
};

export const setRules = (rules: Rule[]) => {
  return {
    type: ruleActions.SET_RULES,
    rules,
  };
};

export const toggleEditMode = () => {
  return {
    type: ruleActions.TOGGLE_EDIT_MODE,
  };
};

export const fetchRules = () => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await RuleService.getRules();
      if (res.payload !== undefined) {
        const rules = res.payload;
        if (rules.every(isRule)) {
          dispatch(setRules(res.payload));
        } else {
          dispatch(errorMessage("Back-end returned malformed rules"));
        }
      } else {
        console.error("Response payload was undefined.");
      }
    } catch (err) {
      // TODO: Proper error handling
      console.error(err);
    }
  };
};

export const moveRuleUp = (id: number) => {
  return {
    type: ruleActions.MOVE_UP,
    id,
  };
};

export const moveRuleDown = (id: number) => {
  return {
    type: ruleActions.MOVE_DOWN,
    id,
  };
};

const ruleReducer: Reducer<RuleState, any> = (state = initialState, action) => {
  switch (action.type) {
    case ruleActions.SET_RULES:
      return { ...{}, ...state, ...{ rules: action.rules } };
    case ruleActions.MOVE_DOWN:
      const downIndex = state.rules.findIndex(
        (rule) => rule.ruleId === action.id,
      );
      const rules = [...state.rules];
      const tmp1 = rules[downIndex + 1];
      rules[downIndex + 1] = rules[downIndex];
      rules[downIndex] = tmp1;
      return { ...state, ...{ rules } };
    case ruleActions.MOVE_UP:
      const upIndex = state.rules.findIndex((rule) => rule.ruleId === action.id);
      const rules1 = [...state.rules];
      const tmp2 = rules1[upIndex - 1];
      rules1[upIndex - 1] = rules1[upIndex];
      rules1[upIndex] = tmp2;
      return { ...state, ...{ rules: rules1 } };
    case ruleActions.TOGGLE_EDIT_MODE:
      return { ...state, ...{ editMode: !state.editMode } };
    default:
      return state;
  }
};

export default ruleReducer;
