import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as rootActions from "./actions/rootActions";
import { SET_APP_LOADED } from "./constants";

export interface RootState {
  readonly appLoading: boolean;
}

const initialState: RootState = {
  appLoading: true,
};

export type RootAction = ActionType<typeof rootActions>;

const rootReducer: Reducer<RootState, RootAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_APP_LOADED:
      return { ...state, appLoading: action.payload.val };
    default:
      return state;
  }
};

export default rootReducer;
