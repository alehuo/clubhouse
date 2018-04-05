import CalendarService from "./../services/CalendarService";

const initialState = {
  events: []
};

const calendarActions = {
  SET_EVENTS: "SET_EVENTS"
};

export const fetchEvents = () => async dispatch => {
  try {
    const events = await CalendarService.getEvents();
    dispatch({
      type: calendarActions.SET_EVENTS,
      events
    });
  } catch (ex) {
    alert(ex.toString());
  }
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case calendarActions.SET_EVENTS:
      return Object.assign({}, state, { events: action.events });
    default:
      return state;
  }
};

export default calendarReducer;
