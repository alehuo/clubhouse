const axios = require("axios");

// User service
const login = async (username, password) =>
  axios.post("api/v1/authenticate", {
    username,
    password
  });

const register = async user =>
  axios.post("api/v1/user", {
    username: user.username,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    unionId: user.unionId
  });

export default { login, register };
