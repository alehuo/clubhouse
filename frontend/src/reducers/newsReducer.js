import NewsService from "../services/NewsService";
import { errorMessage, successMessage } from "./notificationReducer";

const initialState = {
  newsPosts: [],
  editId: 1,
  isAdding: false,
  isEditing: false,
  addModalOpen: false,
  editModalOpen: false
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
  SET_EDIT_ID: "SET_EDIT_ID"
};

export const toggleNewsAddModal = val => {
  return {
    type: newsPostTypes.TOGGLE_ADD_MODAL,
    val
  };
};

export const setEditId = id => {
  return {
    type: newsPostTypes.SET_EDIT_ID,
    id
  };
};

export const toggleNewsEditModal = val => {
  return {
    type: newsPostTypes.TOGGLE_EDIT_MODAL,
    val
  };
};

export const setIsAdding = val => {
  return {
    type: newsPostTypes.SET_IS_ADDING,
    val
  };
};

export const setIsEditing = val => {
  return {
    type: newsPostTypes.SET_IS_EDITING,
    val
  };
};

export const setNewsposts = newsPosts => {
  return {
    type: newsPostTypes.SET_NEWSPOSTS,
    newsPosts
  };
};

export const fetchNewsposts = token => {
  return async dispatch => {
    const posts = await NewsService.getNewsposts(token);
    dispatch(setNewsposts(posts));
  };
};

export const deleteNewspost = (token, id) => {
  return async dispatch => {
    try {
      await NewsService.deleteNewspost(token, id);
      dispatch(deleteNewspostFromList(id));
      dispatch(successMessage("Newspost deleted"));
    } catch (err) {
      dispatch(errorMessage("Failed to delete newspost"));
    }
  };
};

export const addNewspost = (token, title, message) => {
  return async dispatch => {
    dispatch(setIsAdding(true));
    try {
      await NewsService.addNewspost(token, title, message);
      // TODO: Hook to back-end
      dispatch(
        addNewspostToList({
          author: {
            id: 1,
            name: "Testing"
          },
          title,
          message,
          date: new Date()
        })
      );
      dispatch(successMessage("Newspost added"));
    } catch (err) {
      dispatch(errorMessage("Cannot add newspost"));
    }
    dispatch(toggleNewsAddModal(false));
    dispatch(setIsAdding(false));
  };
};

export const editNewspost = (token, id, title, message) => {
  return async dispatch => {
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

export const addNewspostToList = newspost => {
  return {
    type: newsPostTypes.ADD_NEWSPOST_TO_LIST,
    newspost
  };
};

export const deleteNewspostFromList = id => {
  return {
    type: newsPostTypes.DELETE_NEWSPOST_FROM_LIST,
    id
  };
};

export default (state = initialState, action) => {
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
        ...{ newsPosts: [action.newspost, ...state.newsPosts] }
      };
    case newsPostTypes.DELETE_NEWSPOST_FROM_LIST:
      return {
        ...state,
        newsPosts: [
          ...state.newsPosts.filter(newsPost => newsPost.postId !== action.id)
        ]
      };
    case newsPostTypes.SET_IS_ADDING:
      return {
        ...state,
        isAdding: action.val
      };
    case newsPostTypes.SET_IS_EDITING:
      return {
        ...state,
        isEditing: action.val
      };
    case newsPostTypes.SET_EDIT_ID:
      return {
        ...state,
        editId: action.id
      };
    default:
      return state;
  }
};
