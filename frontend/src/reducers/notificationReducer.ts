import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import uuidv1 from "uuid/v1";

export interface NotificationState {
  notifications: Notification[];
}

export interface Notification {
  id: string;
  notificationType: string;
  text: string;
}

const initialState: NotificationState = {
  notifications: [],
};

export const notificationActions = {
  SUCCESS_MESSAGE: "SUCCESS_MESSAGE",
  ERROR_MESSAGE: "ERROR_MESSAGE",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
};

type NotificationType = "ERROR" | "SUCCESS" | "INFO" | "WARNING";

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

export const clearNotification = (id: string) => {
  return {
    type: notificationActions.CLEAR_NOTIFICATION,
    id,
  };
};

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const addNotification = (
  id: string,
  text: string,
  notificationType: NotificationType,
) => {
  return {
    type: notificationActions.ADD_NOTIFICATION,
    id,
    text,
    notificationType,
  };
};

const notificationReducer: Reducer<NotificationState, any> = (state = initialState, action: any) => {
  switch (action.type) {
    case notificationActions.ADD_NOTIFICATION:
      return {
        ...{},
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: action.id,
            notificationType: action.notificationType,
            text: action.text,
          },
        ],
      };
    case notificationActions.CLEAR_NOTIFICATION:
      const notifications = state.notifications.filter(
        (notification: any) => notification.id !== action.id,
      );
      return { ...{}, ...state, ...{ notifications } };
    default:
      return state;
  }
};

export default notificationReducer;
