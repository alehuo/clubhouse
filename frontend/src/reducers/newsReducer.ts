import { Reducer } from "redux";
import { ThunkDispatch } from "redux-thunk";
import NewsService from "../services/NewsService";
import { errorMessage, successMessage } from "./notificationReducer";

interface NewsState {
  newsPosts: NewsPost[];
  editId: number;
  isAdding: boolean;
  isEditing: boolean;
  addModalOpen: boolean;
  editModalOpen: boolean;
}

export interface NewsPost {
  postId: number;
  author: number;
  title: string;
  message: string;
  created_at: string | Date;
}

const initialState: NewsState = {
  newsPosts: [],
  editId: 1,
  isAdding: false,
  isEditing: false,
  addModalOpen: false,
  editModalOpen: false,
};

export const newsPostTypes = {
  TOGGLE_ADD_MODAL: "TOGGLE_NEWSPOSTS_ADD_MODAL",
  TOGGLE_EDIT_MODAL: "TOGGLE_NEWSPOSTS_EDIT_MODAL",
  ADD_NEWSPOST: "ADD_NEWSPOST",
  ADD_NEWSPOST_TO_LIST: "ADD_NEWSPOST_TO_LIST",
  DELETE_NEWSPOST_FROM_LIST: "DELETE_NEWSPOST_FROM_LIST",
  SET_NEWSPOSTS: "SET_NEWSPOSTS",
  REMOVE_NEWSPOST: "REMOVE_NEWSPOST",
  SET_IS_ADDING: "SET_IS_ADDING",
  SET_IS_EDITING: "SET_IS_EDITING",
  SET_EDIT_ID: "SET_EDIT_ID",
};

export const toggleNewsAddModal = (val: boolean) => {
  return {
    type: newsPostTypes.TOGGLE_ADD_MODAL,
    val,
  };
};

export const setEditId = (id: number) => {
  return {
    type: newsPostTypes.SET_EDIT_ID,
    id,
  };
};

export const toggleNewsEditModal = (val: boolean) => {
  return {
    type: newsPostTypes.TOGGLE_EDIT_MODAL,
    val,
  };
};

export const setIsAdding = (val: boolean) => {
  return {
    type: newsPostTypes.SET_IS_ADDING,
    val,
  };
};

export const setIsEditing = (val: boolean) => {
  return {
    type: newsPostTypes.SET_IS_EDITING,
    val,
  };
};

export const setNewsposts = (newsPosts: NewsPost[]) => {
  return {
    type: newsPostTypes.SET_NEWSPOSTS,
    newsPosts,
  };
};

export const fetchNewsposts = (token: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const posts = await NewsService.getNewsposts(token);
    dispatch(setNewsposts(posts));
  };
};

export const deleteNewspost = (token: string, id: number) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await NewsService.deleteNewspost(token, id);
      dispatch(deleteNewspostFromList(id));
      dispatch(successMessage("Newspost deleted"));
    } catch (err) {
      dispatch(errorMessage("Failed to delete newspost"));
    }
  };
};

export const addNewspost = (token: string, title: string, message: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setIsAdding(true));
    try {
      const res = await NewsService.addNewspost(token, title, message);
      // TODO: Hook to back-end
      dispatch(
        addNewspostToList({
          postId: res.postId,
          author: res.author,
          title: res.title,
          message: res.message,
          created_at: new Date().toISOString(),
        }),
      );
      dispatch(successMessage("Newspost added"));
    } catch (err) {
      dispatch(errorMessage("Cannot add newspost"));
    }
    dispatch(toggleNewsAddModal(false));
    dispatch(setIsAdding(false));
  };
};

export const editNewspost = (token: string, id: number, title: string, message: string) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setIsEditing(true));
    try {
      await NewsService.editNewspost(token, id, title, message);
      // TODO: Hook to back-end
      dispatch(successMessage("Newspost edited"));
    } catch (err) {
      dispatch(errorMessage("Cannot edit newspost"));
    }
    dispatch(toggleNewsEditModal(false));
    dispatch(setIsEditing(false));
  };
};

export const addNewspostToList = (newspost: NewsPost) => {
  return {
    type: newsPostTypes.ADD_NEWSPOST_TO_LIST,
    newspost,
  };
};

export const deleteNewspostFromList = (id: number) => {
  return {
    type: newsPostTypes.DELETE_NEWSPOST_FROM_LIST,
    id,
  };
};

const newsReducer: Reducer<NewsState, any> = (state = initialState, action) => {
  switch (action.type) {
    case newsPostTypes.TOGGLE_ADD_MODAL:
      return { ...state, addModalOpen: action.val };
    case newsPostTypes.TOGGLE_EDIT_MODAL:
      return { ...state, editModalOpen: action.val };
    case newsPostTypes.SET_NEWSPOSTS:
      return { ...state, ...{ newsPosts: action.newsPosts } };
    case newsPostTypes.ADD_NEWSPOST_TO_LIST:
      return {
        ...state,
        ...{ newsPosts: [action.newspost, ...state.newsPosts] },
      };
    case newsPostTypes.DELETE_NEWSPOST_FROM_LIST:
      return {
        ...state,
        newsPosts: [
          ...state.newsPosts.filter((newsPost: NewsPost) => newsPost.postId !== action.id),
        ],
      };
    case newsPostTypes.SET_IS_ADDING:
      return {
        ...state,
        isAdding: action.val,
      };
    case newsPostTypes.SET_IS_EDITING:
      return {
        ...state,
        isEditing: action.val,
      };
    case newsPostTypes.SET_EDIT_ID:
      return {
        ...state,
        editId: action.id,
      };
    default:
      return state;
  }
};

export default newsReducer;
