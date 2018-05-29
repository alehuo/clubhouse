import customAxios from "./custom-axios";

const startWatch = async (token, startMessage) =>
  customAxios(token).post("api/v1/watch/start", {
    startMessage
  });

const stopWatch = async (token, endMessage) =>
  customAxios(token).post("api/v1/watch/stop", {
    endMessage
  });

const getOwnWatchStatus = token =>
  customAxios(token).get("api/v1/watch/ownstatus");

export default { startWatch, stopWatch, getOwnWatchStatus };
