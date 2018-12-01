import Axios from "axios";

const customAxios = (token: string) =>
  Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 20000,
    headers: { Authorization: "Bearer " + token }
  });

export default customAxios;
