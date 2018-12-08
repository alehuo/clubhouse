import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ActionType } from "typesafe-actions";
import KeyService from "./../services/KeyService";
import * as keyActions from "./actions/keyActions";
import { errorMessage } from "./actions/notificationActions";
import { SET_KEY_TYPES, SET_KEYS, TOGGLE_KEY_MODAL } from "./constants";

// Initial key reducer state
export interface KeyState {
  readonly keys: any[];
  readonly keyTypes: any[];
  readonly isAdding: boolean;
  readonly modalOpen: boolean;
}

const initialState = {
  keys: [],
  keyTypes: [],
  isAdding: false,
  modalOpen: false,
};

export type KeyAction = ActionType<typeof keyActions>;

export const fetchKeys = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await KeyService.getKeys(token);
      dispatch(keyActions.setKeys(res));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to fetch keys"));
      }
    }
  };
};

export const fetchKeyTypes = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await KeyService.getKeyTypes(token);
      dispatch(keyActions.setKeyTypes(res));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to fetch key types"));
      }
    }
  };
};

const keyReducer: Reducer<KeyState, KeyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_KEYS:
      return { ...{}, ...state, keys: action.payload.keys };
    case SET_KEY_TYPES:
      return { ...{}, ...state, keyTypes: action.payload.keyTypes };
    case TOGGLE_KEY_MODAL:
      return { ...{}, ...state, modalOpen: action.payload.value };
    default:
      return state;
  }
};

export default keyReducer;
