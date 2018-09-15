import KeyService from "./../services/KeyService";
import { errorMessage } from "./notificationReducer";

const initialState = {
  keys: [],
  keyTypes: [],
  isAdding: false,
  modalOpen: false
};

export const keyActions = {
  ADD_KEY: "ADD_KEY",
  SET_KEYS: "SET_KEYS",
  SET_KEY_TYPES: "SET_KEY_TYPES",
  TOGGLE_MODAL: "TOGGLE_MODAL"
};

export const toggleModal = val => {
  return {
    type: keyActions.TOGGLE_MODAL,
    val
  };
};

export const fetchKeys = token => {
  return async dispatch => {
    try {
      const res = await KeyService.getKeys(token);
      dispatch(setKeys(res));
    } catch (ex) {
      dispatch(
        errorMessage("Failed to get list of keyholders from the server")
      );
    }
  };
};

export const fetchKeyTypes = token => {
  return async dispatch => {
    try {
      const res = await KeyService.getKeyTypes(token);
      dispatch(setKeyTypes(res));
    } catch (ex) {
      dispatch(errorMessage("Failed to get list of key types from the server"));
    }
  };
};

export const setKeys = keys => {
  return {
    type: keyActions.SET_KEYS,
    keys
  };
};

export const setKeyTypes = keyTypes => {
  return {
    type: keyActions.SET_KEY_TYPES,
    keyTypes
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case keyActions.SET_KEYS:
      return { ...{}, ...state, keys: action.keys };
    case keyActions.SET_KEY_TYPES:
      return { ...{}, ...state, keyTypes: action.keyTypes };
    case keyActions.TOGGLE_MODAL:
      return { ...{}, ...state, modalOpen: action.val };
    default:
      return state;
  }
};
