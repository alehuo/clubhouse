const axios = require("axios");
const customAxios = require("./custom-axios");

// User service
const login = async (email, password) =>
  axios.post("api/v1/authenticate", {
    email,
    password
  });

const register = async user =>
  axios.post("api/v1/users", {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    unionId: user.unionId
  });

const getUsers = token => customAxios(token).get("api/v1/users");

export default { login, register, getUsers };
