import { action } from "typesafe-actions";
import { SET_KEY_TYPES, SET_KEYS, TOGGLE_KEY_MODAL } from "../constants/keyConstants";

export const toggleModal = (value: boolean) =>
  action(TOGGLE_KEY_MODAL, { value });

export const setKeys = (keys: any[]) => action(SET_KEYS, { keys });

export const setKeyTypes = (keyTypes: any[]) =>
  action(SET_KEY_TYPES, { keyTypes });
