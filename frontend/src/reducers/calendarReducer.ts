import { CalendarEvent } from '@alehuo/clubhouse-shared';
import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions/calendarActions';
import { SET_EVENTS } from './constants';

// Initial calendar reducer state
export interface CalendarState {
    readonly events: CalendarEvent[];
}

const initialState: CalendarState = {
    events: [],
};

export type CalendarAction = ActionType<typeof actions>;

const calendarReducer: Reducer<CalendarState, CalendarAction> = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return { ...{}, ...state, events: action.payload.events };
        default:
            return state;
    }
};

export default calendarReducer;
