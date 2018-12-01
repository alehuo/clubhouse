// Calendar events
import customAxios from "./custom-axios";

export interface CalendarEvent {
  id: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

export const eventMapper = (event: CalendarEvent) => {
  return {
    id: event.id,
    title: event.name,
    desc: event.description,
    start: event.startTime,
    end: event.endTime,
  };
};

const getEvents = async (token: string) =>
  customAxios(token).get("/api/v1/calendar");
const getEvent = async (id: number, token: string) =>
  customAxios(token).get("/api/v1/calendar/" + id);

export default { getEvents, getEvent };
