import KeyService from "./../services/KeyService";
import { errorMessage } from "./notificationReducer";

const initialState = {
  keys: [],
  isAdding: false,
  modalOpen: false
};

export const keyActions = {
  ADD_KEY: "ADD_KEY",
  SET_KEYS: "SET_KEYS",
  TOGGLE_MODAL: "TOGGLE_MODAL"
};

export const toggleModal = val => {
  return {
    type: keyActions.TOGGLE_MODAL,
    val
  };
};

export const fetchKeys = () => {
  return async dispatch => {
    try {
      const res = await KeyService.getKeys();
      dispatch(setKeys(res));
    } catch (ex) {
      dispatch(
        errorMessage("Failed to get list of keyholders from the server")
      );
    }
  };
};

export const setKeys = keys => {
  return {
    type: keyActions.SET_KEYS,
    keys
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case keyActions.SET_KEYS:
      return { ...{}, ...state, keys: action.keys };
    case keyActions.TOGGLE_MODAL:
      return { ...{}, ...state, modalOpen: action.val };
    default:
      return state;
  }
};
