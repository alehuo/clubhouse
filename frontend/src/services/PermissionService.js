// Student union service
const customAxios = require("./custom-axios");

const getUserPermissions = token =>
  customAxios(token).get("api/v1/permission/user");

const getAllPermissions = token => customAxios(token).get("api/v1/permission");

export default { getUserPermissions, getAllPermissions };
