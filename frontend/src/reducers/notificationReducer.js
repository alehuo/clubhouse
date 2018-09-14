import uuidv1 from "uuid/v1";

const initialState = {
  notifications: []
};

export const notificationActions = {
  SUCCESS_MESSAGE: "SUCCESS_MESSAGE",
  ERROR_MESSAGE: "ERROR_MESSAGE",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
  ADD_NOTIFICATION: "ADD_NOTIFICATION"
};

export const notificationTypes = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING"
};

export const successMessage = (text, timeout = 4000) => {
  return async dispatch => {
    const id = uuidv1();
    dispatch(addNotification(id, text, notificationTypes.SUCCESS));
    await wait(timeout);
    dispatch(clearNotification(id));
  };
};

export const errorMessage = (text, timeout = 4000) => {
  return async dispatch => {
    const id = uuidv1();
    dispatch(addNotification(id, text, notificationTypes.ERROR));
    await wait(timeout);
    dispatch(clearNotification(id));
  };
};

export const clearNotification = id => {
  return {
    type: notificationActions.CLEAR_NOTIFICATION,
    id
  };
};

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const addNotification = (id, text, notificationType) => {
  return {
    type: notificationActions.ADD_NOTIFICATION,
    id,
    text,
    notificationType
  };
};

const notificationReducer = (state = initialState, action) => {
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
            text: action.text
          }
        ]
      };
    case notificationActions.CLEAR_NOTIFICATION:
      const notifications = state.notifications.filter(
        notification => notification.id !== action.id
      );
      return { ...{}, ...state, ...{ notifications } };
    default:
      return state;
  }
};

export default notificationReducer;
