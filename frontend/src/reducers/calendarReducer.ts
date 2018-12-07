import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ActionType } from "typesafe-actions";
import CalendarService from "./../services/CalendarService";
import * as actions from "./actions/calendarActions";
import { SET_EVENTS } from "./constants/calendarConstants";
import { errorMessage } from "./notificationReducer";

export interface CalendarState {
  readonly events: any[];
}

const initialState = {
  events: [],
};

export type CalendarAction = ActionType<typeof actions>;

export const fetchEvents = (token: string) => async (
  dispatch: ThunkDispatch<CalendarState, any, CalendarAction>,
) => {
  try {
    const events = await CalendarService.getEvents(token);
    dispatch(actions.setEvents(events.data));
  } catch (err) {
    if (err.response && err.response.data.error) {
      dispatch(errorMessage(err.response.data.error));
    } else {
      // If the response doesn't contain an error key, the back-end might be down
      dispatch(errorMessage("Failed to fetch calendar events"));
    }
  }
};

const calendarReducer: Reducer<CalendarState, CalendarAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SET_EVENTS:
      return { ...{}, ...state, events: action.payload.events };
    default:
      return state;
  }
};

export default calendarReducer;
