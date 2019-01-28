import { action } from "typesafe-actions";
import { SET_APP_LOADED } from "../constants";

export const setAppLoadingState = (val: boolean) =>
  action(SET_APP_LOADED, { val });
