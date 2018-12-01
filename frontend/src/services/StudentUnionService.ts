// Student union service
import customAxios from "./custom-axios";

const getStudentUnions = (token: string) =>
  customAxios(token).get("api/v1/studentunion");

const deleteStudentUnion = (unionId: number, token: string) =>
  customAxios(token).delete("api/v1/studentunion/" + unionId);

const addStudentUnion = async (stdu: any, token: string) =>
  customAxios(token).post("api/v1/studentunion", stdu);

export default { addStudentUnion, getStudentUnions, deleteStudentUnion };
