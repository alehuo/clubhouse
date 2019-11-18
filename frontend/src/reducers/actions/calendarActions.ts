import { ApiResponse, CalendarEvent, isCalendarEvent } from '@alehuo/clubhouse-shared';
import { ThunkDispatch } from 'redux-thunk';
import { action } from 'typesafe-actions';
import CalendarService from '../../services/CalendarService';
import { errorMessage } from '../actions/notificationActions';
import * as calendarActions from '../constants';

export const setEvents = (events: CalendarEvent[]) => action(calendarActions.SET_EVENTS, { events });

export const fetchEvents = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
        const events = await CalendarService.getEvents();
        if (events.payload !== undefined) {
            const calendarEvents = events.payload;
            if (calendarEvents.every(isCalendarEvent)) {
                dispatch(setEvents(calendarEvents));
            } else {
                dispatch(errorMessage('Back-end returned malformed calendar events'));
            }
        } else {
            console.error('Response payload was undefined');
        }
    } catch (err) {
        if (err.response && err.response.data) {
            const res = err.response.data as ApiResponse<undefined>;
            if (res.error !== undefined) {
                dispatch(errorMessage(res.error.message));
            }
        } else {
            // If the response doesn't contain an error key, the back-end might be down
            dispatch(errorMessage('Failed to fetch calendar events'));
        }
    }
};
