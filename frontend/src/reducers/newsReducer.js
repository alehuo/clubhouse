import NewsService from "../services/NewsService";
import { errorMessage, successMessage } from "./notificationReducer";

const initialState = {
  newsPosts: [],
  isAdding: false,
  modalOpen: false
};

export const newsPostTypes = {
  TOGGLE_MODAL: "TOGGLE_NEWSPOSTS_MODAL",
  ADD_NEWSPOST: "ADD_NEWSPOST",
  ADD_NEWSPOST_TO_LIST: "ADD_NEWSPOST_TO_LIST",
  SET_NEWSPOSTS: "SET_NEWSPOSTS",
  REMOVE_NEWSPOST: "REMOVE_NEWSPOST"
};

export const toggleNewsModal = val => {
  return {
    type: newsPostTypes.TOGGLE_MODAL,
    val
  };
};

export const setIsAdding = val => {
  return {
    type: newsPostTypes.TOGGLE_MODAL,
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
    dispatch(toggleNewsModal(false));
    dispatch(setIsAdding(false));
  };
};

export const addNewspostToList = newspost => {
  return {
    type: newsPostTypes.ADD_NEWSPOST_TO_LIST,
    newspost
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case newsPostTypes.TOGGLE_MODAL:
      return { ...state, modalOpen: action.val };
    case newsPostTypes.SET_NEWSPOSTS:
      return { ...state, ...{ newsPosts: action.newsPosts } };
    case newsPostTypes.ADD_NEWSPOST_TO_LIST:
      return {
        ...state,
        ...{ newsPosts: [action.newspost, ...state.newsPosts] }
      };
    default:
      return state;
  }
};
