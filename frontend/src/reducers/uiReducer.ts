import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as uiActions from './actions/uiActions';
import { CLOSE_MENU, OPEN_MENU } from './constants';

// Initial key reducer state
export interface UiState {
    readonly menuOpen: boolean;
}

const initialState: UiState = {
    menuOpen: false,
};

export type UiAction = ActionType<typeof uiActions>;

const uiReducer: Reducer<UiState, UiAction> = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MENU:
            return { ...{}, ...state, menuOpen: true };
        case CLOSE_MENU:
            return { ...{}, ...state, menuOpen: false };
        default:
            return state;
    }
};

export default uiReducer;
