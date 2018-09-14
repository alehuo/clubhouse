import CalendarService from "./../services/CalendarService";
import { errorMessage } from "./notificationReducer";

const initialState = {
  events: []
};

const calendarActions = {
  SET_EVENTS: "SET_EVENTS"
};

export const fetchEvents = token => async dispatch => {
  try {
    const events = await CalendarService.getEvents(token);
    dispatch({
      type: calendarActions.SET_EVENTS,
      events: events.data
    });
  } catch (ex) {
    dispatch(errorMessage("Failed to fetch calendar events"));
  }
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case calendarActions.SET_EVENTS:
      return { ...{}, ...state, events: action.events };
    default:
      return state;
  }
};

export default calendarReducer;
