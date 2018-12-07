import { action } from "typesafe-actions";
import * as calendarActions from "../constants/calendarConstants";

export const setEvents = (events: any) =>
  action(calendarActions.SET_EVENTS, { events });
