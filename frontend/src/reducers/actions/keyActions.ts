import { ApiResponse, Key, KeyType } from "@alehuo/clubhouse-shared";
import { Dispatch } from "redux";
import { action } from "typesafe-actions";
import { isNumber, isString } from "util";
import KeyService from "../../services/KeyService";
import { ADD_KEY_TO_LIST, SET_KEY_TYPES, SET_KEYS, TOGGLE_KEY_MODAL } from "../constants";
import { errorMessage, successMessage } from "./notificationActions";

export const toggleModal = (value: boolean) =>
  action(TOGGLE_KEY_MODAL, { value });

export const setKeys = (keys: Key[]) => action(SET_KEYS, { keys });

export const setKeyTypes = (keyTypes: KeyType[]) =>
  action(SET_KEY_TYPES, { keyTypes });

export const addKeyToList = (key: Key) => action(ADD_KEY_TO_LIST, { key });

export const fetchKeys = (token: string) => {
  return async (dispatch: Dispatch<any>) => {
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
  return async (dispatch: Dispatch<any>) => {
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

export const addKey = (token: string, data: Partial<Key>) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { userId, unionId, description, keyType } = data;
      if (
        !isNumber(userId) ||
        !isNumber(unionId) ||
        !isString(description) ||
        !isNumber(keyType)
      ) {
        dispatch(errorMessage("Malformed request"));
      } else {
        const res = await KeyService.addKey(
          token,
          userId,
          unionId,
          keyType,
          description,
        );
        const addedKey = res.payload!;
        dispatch(addKeyToList(addedKey));
        dispatch(successMessage("Key added successfully"));
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to add key"));
      }
    }
    dispatch(toggleModal(false));
  };
};
