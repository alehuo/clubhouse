import axios from "axios";
import customAxios from "./custom-axios";

// User service
const login = async (email, password) =>
  axios.post(
    "api/v1/authenticate",
    {
      email,
      password
    },
    {
      baseUrl: process.env.REACT_APP_BACKEND_URL
    }
  );

const register = async user =>
  axios.post(
    "api/v1/users",
    {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    },
    {
      baseUrl: process.env.REACT_APP_BACKEND_URL
    }
  );

const remove = async (userId, token) =>
  customAxios(token).delete("api/v1/users/" + Number(userId));

const getUsers = token => customAxios(token).get("api/v1/users");

const getOwnData = async token =>
  customAxios(token).get("api/v1/users/ownData");

export default { login, register, getUsers, remove, getOwnData };
