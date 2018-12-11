import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import KeyService from "../../services/KeyService";
import { SET_KEY_TYPES, SET_KEYS, TOGGLE_KEY_MODAL } from "../constants";
import { errorMessage } from "./notificationActions";

export const toggleModal = (value: boolean) =>
  action(TOGGLE_KEY_MODAL, { value });

export const setKeys = (keys: any[]) => action(SET_KEYS, { keys });

export const setKeyTypes = (keyTypes: any[]) =>
  action(SET_KEY_TYPES, { keyTypes });

export const fetchKeys = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await KeyService.getKeys(token);
      dispatch(setKeys(res));
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
      dispatch(setKeyTypes(res));
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
