import { ApiResponse, DbUser, User } from "@alehuo/clubhouse-shared";
import customAxios from "./custom-axios";

const login = async (email: string, password: string) => {
  const res = await customAxios
    .withoutToken()
    .post<ApiResponse<{ token: string }>>(
      "api/v1/authenticate",
      {
        email,
        password,
      },
      {
        baseURL: process.env.REACT_APP_BACKEND_URL,
      },
    );
  return res.data;
};

const register = async (user: DbUser) => {
  const res = await customAxios.withoutToken().post<ApiResponse<any>>(
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
  return res.data;
};

const remove = async (userId: number, token: string) =>
  customAxios.withToken(token).delete("api/v1/users/" + Number(userId));

const getUsers = async (token: string) => {
  const res = await customAxios
    .withToken(token)
    .get<ApiResponse<User[]>>("api/v1/users");
  return res.data;
};

const getOwnData = async (token: string) => {
  const res = await customAxios
    .withToken(token)
    .get<ApiResponse<any>>("api/v1/users/ownData"); // TODO: Add proper typings
  return res.data;
};

export default { login, register, getUsers, remove, getOwnData };
