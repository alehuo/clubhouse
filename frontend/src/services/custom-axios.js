const axios = require("axios");

const customAxios = token =>
  axios.create({
    timeout: 1000,
    headers: { Authorization: "Bearer " + token }
  });

module.exports = customAxios;
