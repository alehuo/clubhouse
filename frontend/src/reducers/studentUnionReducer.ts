import StudentUnionService from "../services/StudentUnionService";
import { errorMessage, successMessage } from "./notificationReducer";
import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface StudentUnionState {
  studentUnions: any[];
  isAdding: boolean;
  modalOpen: boolean;
}

const initialState = {
  studentUnions: [],
  isAdding: false,
  modalOpen: false
};

export const studentUnionActions = {
  ADD_STUDENT_UNION: "ADD_STUDENT_UNION",
  DELETE_STUDENT_UNION: "DELETE_STUDENT_UNION",
  SET_STUDENT_UNIONS: "SET_STUDENT_UNIONS",
  SET_ADDING: "SET_ADDING",
  ADD_FORM_MODAL_OPEN: "ADD_FORM_MODAL_OPEN",
  ADD_TO_LIST: "ADD_TO_LIST"
};

export const fetchStudentUnions = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await StudentUnionService.getStudentUnions(token);
      dispatch(setStudentUnions(res.data));
    } catch (ex) {
      dispatch(errorMessage(ex.response.data.error));
    }
  };
};

export const setStudentUnions = (studentUnions: any[]) => {
  return {
    type: studentUnionActions.SET_STUDENT_UNIONS,
    studentUnions
  };
};

export const setAdding = (isAdding: boolean) => {
  return {
    type: studentUnionActions.SET_ADDING,
    isAdding
  };
};

export const addFormModalOpen = (status: boolean) => {
  return {
    type: studentUnionActions.ADD_FORM_MODAL_OPEN,
    status
  };
};

export const addStudentUnion = (stdu: any, token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setAdding(true));
    try {
      const res = await StudentUnionService.addStudentUnion(stdu, token);
      const addedUnion = res.data;
      dispatch({
        type: studentUnionActions.ADD_TO_LIST,
        addedUnion
      });
      dispatch(setAdding(false));
      dispatch(addFormModalOpen(false));
      dispatch(successMessage("New student union added successfully"));
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };
};

export const deleteStudentUnion = (unionId: number, token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await StudentUnionService.deleteStudentUnion(unionId, token);
      dispatch({
        type: studentUnionActions.DELETE_STUDENT_UNION,
        unionId
      });
      dispatch(successMessage("Student union deleted successfully"));
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };
};

const studentUnionReducer: Reducer<StudentUnionState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case studentUnionActions.SET_STUDENT_UNIONS:
      return { ...{}, ...state, studentUnions: action.studentUnions };
    case studentUnionActions.SET_ADDING:
      return { ...{}, ...state, isAdding: action.isAdding };
    case studentUnionActions.ADD_FORM_MODAL_OPEN:
      return { ...{}, ...state, modalOpen: action.status };
    case studentUnionActions.ADD_TO_LIST:
      return {
        ...{},
        ...state,
        studentUnions: [...state.studentUnions, action.addedUnion]
      };
    case studentUnionActions.DELETE_STUDENT_UNION:
      const unions = state.studentUnions.filter(
        studentUnion => studentUnion.unionId !== action.unionId
      );
      return {
        ...{},
        ...state,
        studentUnions: unions
      };
    default:
      return state;
  }
};

export default studentUnionReducer;
