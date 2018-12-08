import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import uuidv1 from "uuid/v1";
import { ADD_NOTIFICATION, CLEAR_NOTIFICATION } from "../constants";

type NotificationType = "ERROR" | "SUCCESS" | "INFO" | "WARNING";

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const addNotification = (
  id: string,
  text: string,
  notificationType: NotificationType,
) => action(ADD_NOTIFICATION, { id, text, notificationType });

export const clearNotification = (id: string) =>
  action(CLEAR_NOTIFICATION, { id });

export const successMessage = (text: string, timeout = 4000) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const id = uuidv1();
    dispatch(addNotification(id, text, "SUCCESS"));
    await wait(timeout);
    dispatch(clearNotification(id));
  };
};

export const errorMessage = (text: string, timeout = 4000) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const id = uuidv1();
    dispatch(addNotification(id, text, "ERROR"));
    await wait(timeout);
    dispatch(clearNotification(id));
  };
};
