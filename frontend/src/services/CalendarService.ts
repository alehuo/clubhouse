// Calendar events
import { ApiResponse, CalendarEvent } from "@alehuo/clubhouse-shared";
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

const getEvents = async () => {
  const res = await customAxios
    .withoutToken()
    .get<ApiResponse<CalendarEvent[]>>("/api/v1/calendar");
  return res.data;
};
const getEvent = async (id: number) => {
  const res = await customAxios
    .withoutToken()
    .get<ApiResponse<CalendarEvent>>("/api/v1/calendar/" + id);
  return res.data;
};

export default { getEvents, getEvent };
