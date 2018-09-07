import { create } from "axios";

const customAxios = token =>
  create({
    timeout: 20000,
    headers: { Authorization: "Bearer " + token }
  });

export default customAxios;
