import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as newsActions from "./actions/newsActions";
import {
  ADD_NEWSPOST_TO_LIST,
  DELETE_NEWSPOST_FROM_LIST,
  SET_IS_ADDING_NEWSPOST,
  SET_IS_EDITING_NEWSPOST,
  SET_NEWSPOST_EDIT_ID,
  SET_NEWSPOSTS,
  TOGGLE_ADD_NEWSPOST_MODAL,
  TOGGLE_EDIT_NEWSPOST_MODAL,
} from "./constants";

// Initial newspost reducer state
export interface NewsState {
  readonly newsPosts: NewsPost[];
  readonly editId: number;
  readonly isAdding: boolean;
  readonly isEditing: boolean;
  readonly addModalOpen: boolean;
  readonly editModalOpen: boolean;
}

export interface NewsPost {
  postId: number;
  author: number;
  title: string;
  message: string;
  created_at: string | Date;
}

const initialState = {
  newsPosts: [],
  editId: 1,
  isAdding: false,
  isEditing: false,
  addModalOpen: false,
  editModalOpen: false,
};

export type AuthenticationAction = ActionType<typeof newsActions>;

const newsReducer: Reducer<NewsState, AuthenticationAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case TOGGLE_ADD_NEWSPOST_MODAL:
      return { ...state, addModalOpen: action.payload.val };
    case TOGGLE_EDIT_NEWSPOST_MODAL:
      return { ...state, editModalOpen: action.payload.val };
    case SET_NEWSPOSTS:
      return { ...state, ...{ newsPosts: action.payload.newsPosts } };
    case ADD_NEWSPOST_TO_LIST:
      return {
        ...state,
        ...{ newsPosts: [action.payload.newspost, ...state.newsPosts] },
      };
    case DELETE_NEWSPOST_FROM_LIST:
      return {
        ...state,
        newsPosts: [
          ...state.newsPosts.filter(
            (newsPost: NewsPost) => newsPost.postId !== action.payload.id,
          ),
        ],
      };
    case SET_IS_ADDING_NEWSPOST:
      return {
        ...state,
        isAdding: action.payload.val,
      };
    case SET_IS_EDITING_NEWSPOST:
      return {
        ...state,
        isEditing: action.payload.val,
      };
    case SET_NEWSPOST_EDIT_ID:
      return {
        ...state,
        editId: action.payload.id,
      };
    default:
      return state;
  }
};

export default newsReducer;
