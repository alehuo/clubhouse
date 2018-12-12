import { DbUser, User } from "@alehuo/clubhouse-shared";
import customAxios from "./custom-axios";

// User service
const login = async (email: string, password: string) =>
  customAxios.withoutToken().post(
    "api/v1/authenticate",
    {
      email,
      password,
    },
    {
      baseURL: process.env.REACT_APP_BACKEND_URL,
    },
  );

const register = async (user: DbUser) =>
  customAxios.withoutToken().post(
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
  customAxios.withToken(token).delete("api/v1/users/" + Number(userId));

const getUsers = (token: string) =>
  customAxios.withToken(token).get<User[]>("api/v1/users");

const getOwnData = async (token: string) =>
  customAxios.withToken(token).get("api/v1/users/ownData");

export default { login, register, getUsers, remove, getOwnData };
