import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import CalendarService from "../../services/CalendarService";
import * as calendarActions from "../constants";
import { errorMessage } from "../notificationReducer";

export const setEvents = (events: any) =>
  action(calendarActions.SET_EVENTS, { events });

export const fetchEvents = (token: string) => async (
  dispatch: ThunkDispatch<any, any, any>,
) => {
  try {
    const events = await CalendarService.getEvents(token);
    dispatch(setEvents(events.data));
  } catch (err) {
    if (err.response && err.response.data.error) {
      dispatch(errorMessage(err.response.data.error));
    } else {
      // If the response doesn't contain an error key, the back-end might be down
      dispatch(errorMessage("Failed to fetch calendar events"));
    }
  }
};
