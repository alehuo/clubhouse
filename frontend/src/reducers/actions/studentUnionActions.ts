import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import StudentUnionService from "../../services/StudentUnionService";
import {
  ADD_STUDENT_UNION_FORM_MODAL_OPEN,
  ADD_STUDENT_UNION_TO_LIST,
  DELETE_STUDENT_UNION,
  SET_ADDING_STUDENT_UNION,
  SET_STUDENT_UNIONS,
} from "../constants";
import { errorMessage, successMessage } from "./notificationActions";

export const fetchStudentUnions = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await StudentUnionService.getStudentUnions(token);
      dispatch(setStudentUnions(res.data));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error fetching student unions"));
      }
    }
  };
};

export const setStudentUnions = (studentUnions: any[]) =>
  action(SET_STUDENT_UNIONS, { studentUnions });

export const setAdding = (isAdding: boolean) =>
  action(SET_ADDING_STUDENT_UNION, { isAdding });

export const addFormModalOpen = (status: boolean) =>
  action(ADD_STUDENT_UNION_FORM_MODAL_OPEN, { status });

export const addStudentUnionToList = (stdu: any) =>
  action(ADD_STUDENT_UNION_TO_LIST, { stdu });

export const addStudentUnion = (stdu: any, token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setAdding(true));
    try {
      const res = await StudentUnionService.addStudentUnion(stdu, token);
      const addedUnion = res.data;
      dispatch(addStudentUnionToList(addedUnion));
      dispatch(setAdding(false));
      dispatch(addFormModalOpen(false));
      dispatch(successMessage("New student union added successfully"));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error adding student union"));
      }
    }
  };
};

export const deleteStudentUnionFromList = (unionId: number) =>
  action(DELETE_STUDENT_UNION, { unionId });

export const deleteStudentUnion = (unionId: number, token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await StudentUnionService.deleteStudentUnion(unionId, token);
      dispatch(deleteStudentUnionFromList(unionId));
      dispatch(successMessage("Student union deleted successfully"));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Error deleting student union"));
      }
    }
  };
};
