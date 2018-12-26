import { Key, KeyType } from "@alehuo/clubhouse-shared";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as keyActions from "./actions/keyActions";
import { SET_KEY_TYPES, SET_KEYS, TOGGLE_KEY_MODAL } from "./constants";

// Initial key reducer state
export interface KeyState {
  readonly keys: Key[];
  readonly keyTypes: KeyType[];
  readonly isAdding: boolean;
  readonly modalOpen: boolean;
}

const initialState: KeyState = {
  keys: [],
  keyTypes: [],
  isAdding: false,
  modalOpen: false,
};

export type KeyAction = ActionType<typeof keyActions>;

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
