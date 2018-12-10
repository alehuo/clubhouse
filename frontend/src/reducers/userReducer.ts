import { UserModel } from "@alehuo/clubhouse-shared";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as userActions from "./actions/userActions";
import { CLEAR_USER_DATA, REMOVE_USER, SET_TOKEN, SET_USER_DATA, SET_USERS } from "./constants";

export interface UserState {
  token: string;
  users: UserModel[];
  userData?: UserModel;
  modalOpen: boolean;
  isRegistering: boolean;
}

const initialState = {
  token: "",
  users: [],
  userData: undefined,
  modalOpen: false,
  isRegistering: false,
};

type UserAction = ActionType<typeof userActions>;

const userReducer: Reducer<UserState, UserAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...{}, ...state, ...{ token: action.payload.token } };
    case SET_USERS:
      return { ...{}, ...state, ...{ users: action.payload.users } };
    case REMOVE_USER:
      return {
        ...{},
        ...state,
        ...{
          users: state.users.filter((user) => user.userId !== action.payload.userId),
        },
      };
    case SET_USER_DATA:
      return { ...{}, ...state, ...{ userData: action.payload.data } };
    case CLEAR_USER_DATA:
      return { ...{}, ...state, ...{ userData: {} } };
    default:
      return state;
  }
};

export default userReducer;
