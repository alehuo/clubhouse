// Student union service
const customAxios = require("./custom-axios");

const getStudentUnions = (token) => customAxios(token).get("api/v1/studentunion");

const addStudentUnion = async (stdu, token) =>
  customAxios(token).post("api/v1/studentunion", stdu);

export default { addStudentUnion, getStudentUnions };
