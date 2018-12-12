import { CalendarEvent } from "@alehuo/clubhouse-shared";
import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import CalendarService from "../../services/CalendarService";
import { errorMessage } from "../actions/notificationActions";
import * as calendarActions from "../constants";

export const setEvents = (events: CalendarEvent[]) =>
  action(calendarActions.SET_EVENTS, { events });

export const fetchEvents = () => async (
  dispatch: ThunkDispatch<any, any, any>,
) => {
  try {
    const events = await CalendarService.getEvents();
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
