import customAxios from "./custom-axios";

const startWatch = async (token: string, startMessage: string) =>
  customAxios(token).post("api/v1/watch/start", {
    startMessage,
  });

const stopWatch = async (token: string, endMessage: string) =>
  customAxios(token).post("api/v1/watch/stop", {
    endMessage,
  });

const getOwnWatchStatus = (token: string) =>
  customAxios(token).get("api/v1/watch/ownstatus");

export default { startWatch, stopWatch, getOwnWatchStatus };
