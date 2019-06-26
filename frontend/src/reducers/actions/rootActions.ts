import { action } from "typesafe-actions";
import { INIT_APP, SET_APP_LOADED } from "../constants";

export const setAppLoadingState = (val: boolean) =>
  action(SET_APP_LOADED, { val });

export const initApp = () => action(INIT_APP);
