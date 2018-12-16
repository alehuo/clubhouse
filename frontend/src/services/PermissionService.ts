// Student union service
import { ApiResponse, Permission } from "@alehuo/clubhouse-shared";
import customAxios from "./custom-axios";

const getUserPermissions = async (token: string) => {
  const res = await customAxios.withToken(token).get<
    ApiResponse<{
      permissions: number;
      permission_list: string[];
    }>
  >("api/v1/permission/user");
  return res.data;
};

const getAllPermissions = async (token: string) => {
  const res = await customAxios
    .withToken(token)
    .get<ApiResponse<typeof Permission>>("api/v1/permission");
  return res.data;
};

export default { getUserPermissions, getAllPermissions };
