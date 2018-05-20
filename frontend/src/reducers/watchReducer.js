import watchService from "./../services/WatchService";
import { errorMessage } from "./notificationReducer";
import { watch } from "fs";

const initialState = {
  watchPage: false,
  ownWatchRunning: false,
  ownWatchPeopleCount: 0,
  watchCheckInterval: null
};

export const watchActions = {
  TOGGLE_WATCH_PAGE: "TOGGLE_WATCH_PAGE",
  FETCH_OWN_WATCH_STATUS: "FETCH_OWN_WATCH_STATUS",
  SET_OWN_WATCH_STATUS: "SET_OWN_WATCH_STATUS",
  SET_WATCH_CHECK_INTERVAL: "SET_WATCH_CHECK_INTERVAL"
};

export const toggleWatchPage = value => {
  return {
    type: watchActions.TOGGLE_WATCH_PAGE,
    value
  };
};

export const setWatchCheckInterval = obj => {
  return {
    type: watchActions.SET_WATCH_CHECK_INTERVAL,
    obj
  };
};

export const fetchOwnWatchStatus = token => {
  return async dispatch => {
    try {
      const ownWatchStatus = await watchService.getOwnWatchStatus(token);
      dispatch(
        setOwnWatchStatus(
          ownWatchStatus.data.running,
          ownWatchStatus.data.peopleCount
        )
      );
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };
};

export const setOwnWatchStatus = (ownWatchRunning, ownWatchPeopleCount) => {
  return {
    type: watchActions.SET_OWN_WATCH_STATUS,
    ownWatchRunning,
    ownWatchPeopleCount
  };
};

const watchReducer = (state = initialState, action) => {
  switch (action.type) {
    case watchActions.TOGGLE_WATCH_PAGE:
      return Object.assign({}, state, { watchPage: action.value });
    case watchActions.SET_OWN_WATCH_STATUS:
      return Object.assign({}, state, {
        ownWatchRunning: action.ownWatchRunning,
        ownWatchPeopleCount: action.ownWatchPeopleCount
      });
    case watchActions.SET_WATCH_CHECK_INTERVAL:
      return Object.assign({}, state, {
        watchCheckInterval: action.obj
      });
    default:
      return state;
  }
};

export default watchReducer;
