import {
  ADD_NEWSPOST_TO_LIST,
  DELETE_NEWSPOST_FROM_LIST,
  TOGGLE_ADD_NEWSPOST_MODAL,
} from "../constants";
import {
  addNewspostToList,
  deleteNewspostFromList,
  toggleNewsAddModal,
} from "./newsActions";

describe("News actions", () => {
  it("Should create an action to add a newspost to list", () => {
    const post = {
      postId: 1,
      title: "Hello",
      author: 1,
      message: "Hello World",
      created_at: "",
      updated_at: "",
    };
    const expectedAction: ReturnType<typeof addNewspostToList> = {
      type: ADD_NEWSPOST_TO_LIST,
      payload: {
        newspost: { ...post },
      },
    };
    expect(addNewspostToList({ ...post })).toEqual(expectedAction);
  });
  it("Should create an action to delete a newspost from a list", () => {
    const expectedAction: ReturnType<typeof deleteNewspostFromList> = {
      type: DELETE_NEWSPOST_FROM_LIST,
      payload: {
        id: 1,
      },
    };
    expect(deleteNewspostFromList(1)).toEqual(expectedAction);
  });

  it("Should create an action to toggle the add newspost modal", () => {
    const expectedAction: ReturnType<typeof toggleNewsAddModal> = {
      type: TOGGLE_ADD_NEWSPOST_MODAL,
      payload: {
        val: true,
      },
    };
    expect(toggleNewsAddModal(true)).toEqual(expectedAction);
  });
});
