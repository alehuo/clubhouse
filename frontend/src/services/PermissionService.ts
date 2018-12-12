// Student union service
import customAxios from "./custom-axios";

const getUserPermissions = (token: string) =>
  customAxios.withToken(token).get("api/v1/permission/user");

const getAllPermissions = (token: string) =>
  customAxios.withToken(token).get("api/v1/permission");

export default { getUserPermissions, getAllPermissions };
