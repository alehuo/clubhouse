import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as sessionActions from "./actions/sessionActions";
import {
  SET_OWN_SESSION_STATUS,
  SET_SESSION_CHECK_INTERVAL,
  TOGGLE_END_SESSION_MODAL,
  TOGGLE_IS_ENDING,
  TOGGLE_IS_STARTING,
  TOGGLE_SESSION_PAGE,
  TOGGLE_START_SESSION_MODAL,
} from "./constants";

export interface SessionState {
  readonly sessionPage: boolean;
  readonly ownSessionRunning: boolean;
  readonly ownSessionPeopleCount: number;
  readonly ownSessionStartTime?: string;
  readonly sessionCheckInterval?: NodeJS.Timeout;
  readonly endSessionModalOpen: boolean;
  readonly startSessionModalOpen: boolean;
  readonly sendMessageModalOpen: boolean;
  readonly isEnding: boolean;
  readonly isStarting: boolean;
}

const initialState: SessionState = {
  sessionPage: false,
  ownSessionRunning: false,
  ownSessionPeopleCount: 0,
  ownSessionStartTime: undefined,
  sessionCheckInterval: undefined,
  endSessionModalOpen: false,
  startSessionModalOpen: false,
  sendMessageModalOpen: false,
  isEnding: false,
  isStarting: false,
};

export type SessionAction = ActionType<typeof sessionActions>;

const sessionReducer: Reducer<SessionState, SessionAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case TOGGLE_SESSION_PAGE:
      return {
        ...{},
        ...state,
        ...{ sessionPage: action.payload.value },
      };
    case SET_OWN_SESSION_STATUS:
      return {
        ...{},
        ...state,
        ...{
          ownSessionRunning: action.payload.ownSessionRunning,
          ownSessionPeopleCount: action.payload.ownSessionPeopleCount,
          ownSessionStartTime: action.payload.ownSessionStartTime,
        },
      };
    case SET_SESSION_CHECK_INTERVAL:
      return {
        ...{},
        ...state,
        ...{
          sessionCheckInterval: action.payload.interval,
        },
      };
    case TOGGLE_END_SESSION_MODAL:
      return {
        ...{},
        ...state,
        ...{
          endSessionModalOpen: action.payload.value,
        },
      };
    case TOGGLE_START_SESSION_MODAL:
      return {
        ...{},
        ...state,
        ...{
          startSessionModalOpen: action.payload.value,
        },
      };
    case TOGGLE_IS_ENDING:
      return {
        ...{},
        ...state,
        ...{
          isEnding: action.payload.value,
        },
      };
    case TOGGLE_IS_STARTING:
      return {
        ...{},
        ...state,
        ...{
          isStarting: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default sessionReducer;
