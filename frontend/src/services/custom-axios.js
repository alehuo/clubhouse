import { create } from "axios";

const customAxios = token =>
  create({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    timeout: 20000,
    headers: { Authorization: "Bearer " + token }
  });

export default customAxios;
