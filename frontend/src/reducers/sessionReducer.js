import watchService from "../services/SessionService";
import { errorMessage, successMessage } from "./notificationReducer";

const initialState = {
  watchPage: false,
  ownWatchRunning: false,
  ownWatchPeopleCount: 0,
  watchCheckInterval: null,
  endWatchModalOpen: false,
  startWatchModalOpen: false,
  sendMessageModalOpen: false,
  isEnding: false,
  isStarting: false
};

export const watchActions = {
  TOGGLE_SESSION_PAGE: "TOGGLE_SESSION_PAGE",
  FETCH_OWN_SESSION_STATUS: "FETCH_OWN_SESSION_STATUS",
  SET_OWN_SESSION_STATUS: "SET_OWN_SESSION_STATUS",
  SET_SESSION_CHECK_INTERVAL: "SET_SESSION_CHECK_INTERVAL",
  TOGGLE_START_SESSION_MODAL: "TOGGLE_START_SESSION_MODAL",
  TOGGLE_END_SESSION_MODAL: "TOGGLE_END_SESSION_MODAL",
  TOGGLE_IS_ENDING: "TOGGLE_IS_ENDING",
  TOGGLE_IS_STARTING: "TOGGLE_IS_STARTING"
};

export const toggleWatchPage = value => {
  return {
    type: watchActions.TOGGLE_SESSION_PAGE,
    value
  };
};

export const toggleIsEnding = value => {
  return {
    type: watchActions.TOGGLE_IS_ENDING,
    value
  };
};

export const toggleIsStarting = value => {
  return {
    type: watchActions.TOGGLE_IS_STARTING,
    value
  };
};

export const toggleStartWatchModal = value => {
  return {
    type: watchActions.TOGGLE_START_SESSION_MODAL,
    value
  };
};

export const toggleEndWatchModal = value => {
  return {
    type: watchActions.TOGGLE_END_SESSION_MODAL,
    value
  };
};

export const setWatchCheckInterval = obj => {
  return {
    type: watchActions.SET_SESSION_CHECK_INTERVAL,
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
    type: watchActions.SET_OWN_SESSION_STATUS,
    ownWatchRunning,
    ownWatchPeopleCount
  };
};

export const endWatch = (token, endMessage) => {
  return async dispatch => {
    dispatch(toggleIsEnding(true));
    try {
      await watchService.stopWatch(token, endMessage);
      dispatch(successMessage("Your watch has been ended."));
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
    dispatch(toggleEndWatchModal(false));
    dispatch(toggleIsEnding(false));
    dispatch(fetchOwnWatchStatus(token));
  };
};

export const startWatch = (token, startMessage) => {
  return async dispatch => {
    dispatch(toggleIsStarting(true));
    try {
      await watchService.startWatch(token, startMessage);
      dispatch(successMessage("Your watch has been started."));
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
    dispatch(toggleStartWatchModal(false));
    dispatch(toggleIsStarting(false));
    dispatch(fetchOwnWatchStatus(token));
  };
};

const watchReducer = (state = initialState, action) => {
  switch (action.type) {
    case watchActions.TOGGLE_SESSION_PAGE:
      return {
        ...{},
        ...state,
        ...{ watchPage: action.value }
      };
    case watchActions.SET_OWN_SESSION_STATUS:
      return {
        ...{},
        ...state,
        ...{
          ownWatchRunning: action.ownWatchRunning,
          ownWatchPeopleCount: action.ownWatchPeopleCount
        }
      };
    case watchActions.SET_SESSION_CHECK_INTERVAL:
      return {
        ...{},
        ...state,
        ...{
          watchCheckInterval: action.obj
        }
      };
    case watchActions.TOGGLE_END_SESSION_MODAL:
      return {
        ...{},
        ...state,
        ...{
          endWatchModalOpen: action.value
        }
      };
    case watchActions.TOGGLE_START_SESSION_MODAL:
      return {
        ...{},
        ...state,
        ...{
          startWatchModalOpen: action.value
        }
      };
    case watchActions.TOGGLE_IS_ENDING:
      return {
        ...{},
        ...state,
        ...{
          isEnding: action.value
        }
      };
    case watchActions.TOGGLE_IS_STARTING:
      return {
        ...{},
        ...state,
        ...{
          isStarting: action.value
        }
      };
    default:
      return state;
  }
};

export default watchReducer;
