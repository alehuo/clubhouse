const initialState = {
  watchPage: false
};

export const watchActions = {
  TOGGLE_WATCH_PAGE: "TOGGLE_WATCH_PAGE"
};

export const toggleWatchPage = value => {
  return {
    type: watchActions.TOGGLE_WATCH_PAGE,
    value
  };
};

const watchReducer = (state = initialState, action) => {
  switch (action.type) {
    case watchActions.TOGGLE_WATCH_PAGE:
      return Object.assign({}, state, { watchPage: action.value });
    default:
      return state;
  }
};

export default watchReducer;
