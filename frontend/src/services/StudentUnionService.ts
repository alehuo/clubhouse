// Student union service
import { ApiResponse, StudentUnion } from "@alehuo/clubhouse-shared";
import customAxios from "./custom-axios";

const getStudentUnions = async (token: string) => {
  const res = await customAxios
    .withToken(token)
    .get<ApiResponse<StudentUnion[]>>("api/v1/studentunion");
  return res.data;
};

const deleteStudentUnion = async (unionId: number, token: string) => {
  const res = await customAxios
    .withToken(token)
    .delete("api/v1/studentunion/" + unionId);
  return res.data as ApiResponse<undefined>;
};

const addStudentUnion = async (stdu: any, token: string) => {
  const res = await customAxios
    .withToken(token)
    .post<ApiResponse<StudentUnion>>("api/v1/studentunion", stdu);
  return res.data;
};

export default { addStudentUnion, getStudentUnions, deleteStudentUnion };
