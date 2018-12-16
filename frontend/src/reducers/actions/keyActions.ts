import { ApiResponse } from "@alehuo/clubhouse-shared";
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
      if (res.payload !== undefined) {
        dispatch(setKeys(res.payload));
      } else {
        console.error("Response payload was undefined");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(errorMessage(err.response.data));
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
      if (res.payload !== undefined) {
        dispatch(setKeyTypes(res.payload));
      } else {
        console.error("Response payload was undefined.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to fetch key types"));
      }
    }
  };
};
