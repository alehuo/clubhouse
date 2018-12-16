import { ApiResponse } from "@alehuo/clubhouse-shared";
import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import * as sessionService from "../../services/SessionService";
import {
  SET_OWN_SESSION_STATUS,
  SET_SESSION_CHECK_INTERVAL,
  TOGGLE_END_SESSION_MODAL,
  TOGGLE_IS_ENDING,
  TOGGLE_IS_STARTING,
  TOGGLE_SESSION_PAGE,
  TOGGLE_START_SESSION_MODAL,
} from "../constants";
import { errorMessage, successMessage } from "./notificationActions";

export const toggleSessionPage = (value: boolean) =>
  action(TOGGLE_SESSION_PAGE, { value });

export const toggleIsEnding = (value: boolean) =>
  action(TOGGLE_IS_ENDING, { value });

export const toggleIsStarting = (value: boolean) =>
  action(TOGGLE_IS_STARTING, { value });

export const toggleStartSessionModal = (value: boolean) =>
  action(TOGGLE_START_SESSION_MODAL, { value });

export const toggleEndSessionModal = (value: boolean) =>
  action(TOGGLE_END_SESSION_MODAL, { value });

export const setSessionCheckInterval = (interval: NodeJS.Timeout) =>
  action(SET_SESSION_CHECK_INTERVAL, { interval });

export const fetchOwnSessionStatus = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const ownSessionStatus = await sessionService.getOwnSessionStatus(token);
      if (ownSessionStatus.payload !== undefined) {
        const session = ownSessionStatus.payload;
        dispatch(
          setOwnSessionStatus(
            session.running,
            session.peopleCount,
            session.startTime,
          ),
        );
      } else {
        console.error("Response payload was undefined.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error fetching watch status"));
      }
    }
  };
};

export const setOwnSessionStatus = (
  ownSessionRunning: boolean,
  ownSessionPeopleCount: number,
  ownSessionStartTime: string,
) =>
  action(SET_OWN_SESSION_STATUS, {
    ownSessionRunning,
    ownSessionPeopleCount,
    ownSessionStartTime,
  });

export const endSession = (token: string, endMessage: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(toggleIsEnding(true));
    try {
      await sessionService.stopSession(token, endMessage);
      dispatch(successMessage("Your session has ended."));
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(errorMessage(err.response.data));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error ending session"));
      }
    }
    dispatch(toggleEndSessionModal(false));
    dispatch(toggleIsEnding(false));
    dispatch(fetchOwnSessionStatus(token));
  };
};

export const startSession = (token: string, startMessage: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(toggleIsStarting(true));
    try {
      await sessionService.startSession(token, startMessage);
      dispatch(successMessage("Your session has started."));
    } catch (err) {
      if (err.response && err.response.data) {
        const res = err.response.data as ApiResponse<undefined>;
        if (res.error !== undefined) {
          dispatch(errorMessage(res.error.message));
        }
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error starting session"));
      }
    }
    dispatch(toggleStartSessionModal(false));
    dispatch(toggleIsStarting(false));
    dispatch(fetchOwnSessionStatus(token));
  };
};
