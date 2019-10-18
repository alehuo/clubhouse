import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as notificationActions from "./actions/notificationActions";
import { NotificationType } from "./actions/notificationActions";
import { ADD_NOTIFICATION, CLEAR_NOTIFICATION } from "./constants";

// Initial notification reducer state
export interface NotificationState {
  readonly notifications: Notification[];
}

export interface Notification {
  readonly id: string;
  readonly notificationType: NotificationType;
  readonly text: string;
}

const initialState: NotificationState = {
  notifications: [],
};

type NotificationAction = ActionType<typeof notificationActions>;

const notificationReducer: Reducer<NotificationState, NotificationAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...{},
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: action.payload.id,
            notificationType: action.payload.notificationType,
            text: action.payload.text,
          },
        ],
      };
    case CLEAR_NOTIFICATION:
      const notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id,
      );
      return { ...{}, ...state, ...{ notifications } };
    default:
      return state;
  }
};

export default notificationReducer;
