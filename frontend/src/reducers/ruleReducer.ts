import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import RuleService from "./../services/RuleService";

export interface RuleState {
  readonly rules: any[];
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

export const setRules = (rules: any[]) => {
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
    const rules = await RuleService.getRulesMock();
    dispatch(setRules(rules));
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
      const downIndex = state.rules.findIndex((rule) => rule.id === action.id);
      const rules = [...state.rules];
      const tmp1 = rules[downIndex + 1];
      rules[downIndex + 1] = rules[downIndex];
      rules[downIndex] = tmp1;
      return { ...state, ...{ rules } };
    case ruleActions.MOVE_UP:
      const upIndex = state.rules.findIndex((rule) => rule.id === action.id);
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
