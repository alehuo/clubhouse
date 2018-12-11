import axios from "axios";
import customAxios from "./custom-axios";

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// User service
const login = async (email: string, password: string) =>
  axios.post(
    "api/v1/authenticate",
    {
      email,
      password,
    },
    {
      baseURL: process.env.REACT_APP_BACKEND_URL,
    },
  );

const register = async (user: User) =>
  axios.post(
    "api/v1/users",
    {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    {
      baseURL: process.env.REACT_APP_BACKEND_URL,
    },
  );

const remove = async (userId: number, token: string) =>
  customAxios(token).delete("api/v1/users/" + Number(userId));

const getUsers = (token: string) => customAxios(token).get("api/v1/users");

const getOwnData = async (token: string) =>
  customAxios(token).get("api/v1/users/ownData");

export default { login, register, getUsers, remove, getOwnData };
