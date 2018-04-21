import KeyService from "./../services/KeyService";
import { errorMessage } from "./notificationReducer";

const initialState = {
  keys: []
};

export const keyActions = {
  ADD_KEY: "ADD_KEY",
  SET_KEYS: "SET_KEYS"
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
      return Object.assign({}, state, { keys: action.keys });
    default:
      return state;
  }
};
