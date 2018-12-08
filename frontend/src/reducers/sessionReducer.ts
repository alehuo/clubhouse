import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import watchService from "../services/SessionService";
import { errorMessage, successMessage } from "./actions/notificationActions";

export interface SessionState {
  readonly watchPage: boolean;
  readonly ownWatchRunning: boolean;
  readonly ownWatchPeopleCount: number;
  readonly watchCheckInterval: any;
  readonly endWatchModalOpen: boolean;
  readonly startWatchModalOpen: boolean;
  readonly sendMessageModalOpen: boolean;
  readonly isEnding: boolean;
  readonly isStarting: boolean;
}

const initialState = {
  watchPage: false,
  ownWatchRunning: false,
  ownWatchPeopleCount: 0,
  watchCheckInterval: null,
  endWatchModalOpen: false,
  startWatchModalOpen: false,
  sendMessageModalOpen: false,
  isEnding: false,
  isStarting: false,
};

export const watchActions = {
  TOGGLE_SESSION_PAGE: "TOGGLE_SESSION_PAGE",
  FETCH_OWN_SESSION_STATUS: "FETCH_OWN_SESSION_STATUS",
  SET_OWN_SESSION_STATUS: "SET_OWN_SESSION_STATUS",
  SET_SESSION_CHECK_INTERVAL: "SET_SESSION_CHECK_INTERVAL",
  TOGGLE_START_SESSION_MODAL: "TOGGLE_START_SESSION_MODAL",
  TOGGLE_END_SESSION_MODAL: "TOGGLE_END_SESSION_MODAL",
  TOGGLE_IS_ENDING: "TOGGLE_IS_ENDING",
  TOGGLE_IS_STARTING: "TOGGLE_IS_STARTING",
};

export const toggleWatchPage = (value: boolean) => {
  return {
    type: watchActions.TOGGLE_SESSION_PAGE,
    value,
  };
};

export const toggleIsEnding = (value: boolean) => {
  return {
    type: watchActions.TOGGLE_IS_ENDING,
    value,
  };
};

export const toggleIsStarting = (value: boolean) => {
  return {
    type: watchActions.TOGGLE_IS_STARTING,
    value,
  };
};

export const toggleStartWatchModal = (value: boolean) => {
  return {
    type: watchActions.TOGGLE_START_SESSION_MODAL,
    value,
  };
};

export const toggleEndWatchModal = (value: boolean) => {
  return {
    type: watchActions.TOGGLE_END_SESSION_MODAL,
    value,
  };
};

export const setWatchCheckInterval = (obj: any) => {
  return {
    type: watchActions.SET_SESSION_CHECK_INTERVAL,
    obj,
  };
};

export const fetchOwnWatchStatus = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const ownWatchStatus = await watchService.getOwnWatchStatus(token);
      dispatch(
        setOwnWatchStatus(
          ownWatchStatus.data.running,
          ownWatchStatus.data.peopleCount,
          ownWatchStatus.data.startTime,
        ),
      );
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error fetching watch status"));
      }
    }
  };
};

export const setOwnWatchStatus = (
  ownWatchRunning: boolean,
  ownWatchPeopleCount: number,
  ownWatchStartTime: Date,
) => {
  return {
    type: watchActions.SET_OWN_SESSION_STATUS,
    ownWatchRunning,
    ownWatchPeopleCount,
    ownWatchStartTime,
  };
};

export const endWatch = (token: string, endMessage: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(toggleIsEnding(true));
    try {
      await watchService.stopWatch(token, endMessage);
      dispatch(successMessage("Your session has ended."));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error ending session"));
      }
    }
    dispatch(toggleEndWatchModal(false));
    dispatch(toggleIsEnding(false));
    dispatch(fetchOwnWatchStatus(token));
  };
};

export const startWatch = (token: string, startMessage: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(toggleIsStarting(true));
    try {
      await watchService.startWatch(token, startMessage);
      dispatch(successMessage("Your session has started."));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error starting session"));
      }
    }
    dispatch(toggleStartWatchModal(false));
    dispatch(toggleIsStarting(false));
    dispatch(fetchOwnWatchStatus(token));
  };
};

const watchReducer: Reducer<SessionState, any> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case watchActions.TOGGLE_SESSION_PAGE:
      return {
        ...{},
        ...state,
        ...{ watchPage: action.value },
      };
    case watchActions.SET_OWN_SESSION_STATUS:
      return {
        ...{},
        ...state,
        ...{
          ownWatchRunning: action.ownWatchRunning,
          ownWatchPeopleCount: action.ownWatchPeopleCount,
          ownWatchStartTime: action.ownWatchStartTime,
        },
      };
    case watchActions.SET_SESSION_CHECK_INTERVAL:
      return {
        ...{},
        ...state,
        ...{
          watchCheckInterval: action.obj,
        },
      };
    case watchActions.TOGGLE_END_SESSION_MODAL:
      return {
        ...{},
        ...state,
        ...{
          endWatchModalOpen: action.value,
        },
      };
    case watchActions.TOGGLE_START_SESSION_MODAL:
      return {
        ...{},
        ...state,
        ...{
          startWatchModalOpen: action.value,
        },
      };
    case watchActions.TOGGLE_IS_ENDING:
      return {
        ...{},
        ...state,
        ...{
          isEnding: action.value,
        },
      };
    case watchActions.TOGGLE_IS_STARTING:
      return {
        ...{},
        ...state,
        ...{
          isStarting: action.value,
        },
      };
    default:
      return state;
  }
};

export default watchReducer;
