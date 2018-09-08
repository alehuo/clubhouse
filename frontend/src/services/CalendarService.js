// Calendar events
import customAxios from "./custom-axios";

export const eventMapper = event => {
  return {
    id: event.id,
    title: event.name,
    desc: event.description,
    start: event.startTime,
    end: event.endTime
  };
};

const getEvents = async token => customAxios(token).get("/api/v1/calendar");
const getEvent = async (id, token) =>
  customAxios(token).get("/api/v1/calendar/" + id);

export default { getEvents, getEvent };
