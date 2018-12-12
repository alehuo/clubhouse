// Student union service
import { StudentUnion } from "@alehuo/clubhouse-shared";
import customAxios from "./custom-axios";

const getStudentUnions = (token: string) =>
  customAxios.withToken(token).get<StudentUnion[]>("api/v1/studentunion");

const deleteStudentUnion = (unionId: number, token: string) =>
  customAxios.withToken(token).delete("api/v1/studentunion/" + unionId);

const addStudentUnion = async (stdu: any, token: string) =>
  customAxios.withToken(token).post("api/v1/studentunion", stdu);

export default { addStudentUnion, getStudentUnions, deleteStudentUnion };
