import { Newspost } from "@alehuo/clubhouse-shared";
import moment from "moment";
import { ThunkDispatch } from "redux-thunk";
import { action } from "typesafe-actions";
import NewsService from "../../services/NewsService";
import { errorMessage, successMessage } from "../actions/notificationActions";
import {
  ADD_NEWSPOST_TO_LIST,
  DELETE_NEWSPOST_FROM_LIST,
  SET_IS_ADDING_NEWSPOST,
  SET_IS_EDITING_NEWSPOST,
  SET_NEWSPOST_EDIT_ID,
  SET_NEWSPOSTS,
  TOGGLE_ADD_NEWSPOST_MODAL,
  TOGGLE_EDIT_NEWSPOST_MODAL,
} from "../constants";

export const addNewspostToList = (newspost: Newspost) =>
  action(ADD_NEWSPOST_TO_LIST, { newspost });

export const deleteNewspostFromList = (id: number) =>
  action(DELETE_NEWSPOST_FROM_LIST, { id });

export const toggleNewsAddModal = (val: boolean) =>
  action(TOGGLE_ADD_NEWSPOST_MODAL, { val });

export const setEditId = (id: number) => action(SET_NEWSPOST_EDIT_ID, { id });

export const toggleNewsEditModal = (val: boolean) =>
  action(TOGGLE_EDIT_NEWSPOST_MODAL, { val });

export const setIsAdding = (val: boolean) =>
  action(SET_IS_ADDING_NEWSPOST, { val });

export const setIsEditing = (val: boolean) =>
  action(SET_IS_EDITING_NEWSPOST, { val });

export const setNewsposts = (newsPosts: Newspost[]) =>
  action(SET_NEWSPOSTS, { newsPosts });

export const fetchNewsposts = () => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const posts = await NewsService.getNewsposts();
      dispatch(setNewsposts(posts));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to fetch newsposts"));
      }
    }
  };
};

export const deleteNewspost = (token: string, id: number) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      await NewsService.deleteNewspost(token, id);
      dispatch(deleteNewspostFromList(id));
      dispatch(successMessage("Newspost deleted"));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to delete newspost"));
      }
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
          created_at: moment().toISOString(),
          updated_at: moment().toISOString(),
        }),
      );
      dispatch(successMessage("Newspost added"));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to add newspost"));
      }
    }
    dispatch(toggleNewsAddModal(false));
    dispatch(setIsAdding(false));
  };
};

export const editNewspost = (
  token: string,
  id: number,
  title: string,
  message: string,
) => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setIsEditing(true));
    try {
      await NewsService.editNewspost(token, id, title, message);
      // TODO: Hook to back-end
      dispatch(successMessage("Newspost edited"));
    } catch (err) {
      if (err.response && err.response.data.error) {
        dispatch(errorMessage(err.response.data.error));
      } else {
        // If the response doesn't contain an error key, the back-end might be down
        dispatch(errorMessage("Failed to edit newspost"));
      }
    }
    dispatch(toggleNewsEditModal(false));
    dispatch(setIsEditing(false));
  };
};
