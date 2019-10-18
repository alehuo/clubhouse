import { SET_EVENTS } from "../constants";
import { setEvents } from "./calendarActions";

describe("Calendar actions", () => {
  it("Should create an action to set events", () => {
    const expectedAction: ReturnType<typeof setEvents> = {
      type: SET_EVENTS,
      payload: {
        events: [],
      },
    };
    expect(setEvents([])).toEqual(expectedAction);
  });
  it("Should create an action to fetch events", () => {
    // TODO: Move API fetch to Saga
    expect(true).toEqual(true);
  });
});
