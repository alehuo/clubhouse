// Calendar events
import { CalendarEvent } from "@alehuo/clubhouse-shared";
import customAxios from "./custom-axios";

export const eventMapper = (event: CalendarEvent) => {
  return {
    id: event.eventId,
    title: event.name,
    desc: event.description,
    start: event.startTime,
    end: event.endTime,
  };
};

const getEvents = async () =>
  customAxios.withoutToken().get<CalendarEvent[]>("/api/v1/calendar");
const getEvent = async (id: number) =>
  customAxios.withoutToken().get<CalendarEvent>("/api/v1/calendar/" + id);

export default { getEvents, getEvent };
