import StudentUnionService from "./../services/StudentUnionService";
import { errorMessage } from "./notificationReducer";

const initialState = {
  studentUnions: [],
  isAdding: false,
  modalOpen: false
};

export const studentUnionActions = {
  ADD_STUDENT_UNION: "ADD_STUDENT_UNION",
  SET_STUDENT_UNIONS: "SET_STUDENT_UNIONS",
  SET_ADDING: "SET_ADDING",
  ADD_FORM_MODAL_OPEN: "ADD_FORM_MODAL_OPEN",
  ADD_TO_LIST: "ADD_TO_LIST"
};

export const fetchStudentUnions = (token) => {
  return async dispatch => {
    try {
      const res = await StudentUnionService.getStudentUnions(token);
      dispatch(setStudentUnions(res.data));
    } catch (ex) {
      console.error(ex);
      dispatch(
        errorMessage("Failed to get list of student unions from the server")
      );
    }
  };
};

export const setStudentUnions = studentUnions => {
  return {
    type: studentUnionActions.SET_STUDENT_UNIONS,
    studentUnions
  };
};

export const setAdding = isAdding => {
  return {
    type: studentUnionActions.SET_ADDING,
    isAdding
  };
};

export const addFormModalOpen = status => {
  return {
    type: studentUnionActions.ADD_FORM_MODAL_OPEN,
    status
  };
};

export const addStudentUnion = (stdu, token) => {
  return async dispatch => {
    dispatch(setAdding(true));
    try {
      const res = await StudentUnionService.addStudentUnion(stdu, token);
      const addedUnion = res.data;
      console.table(addedUnion);
      dispatch({
        type: studentUnionActions.ADD_TO_LIST,
        addedUnion
      });
      dispatch(setAdding(false));
      dispatch(addFormModalOpen(false));
    } catch (err) {}
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case studentUnionActions.SET_STUDENT_UNIONS:
      return Object.assign({}, state, { studentUnions: action.studentUnions });
    case studentUnionActions.SET_ADDING:
      return Object.assign({}, state, { isAdding: action.isAdding });
    case studentUnionActions.ADD_FORM_MODAL_OPEN:
      return Object.assign({}, state, { modalOpen: action.status });
    case studentUnionActions.ADD_TO_LIST:
      return Object.assign({}, state, {
        studentUnions: [...state.studentUnions, action.addedUnion]
      });
    default:
      return state;
  }
};
