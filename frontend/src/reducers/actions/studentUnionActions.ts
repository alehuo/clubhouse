import { ApiResponse, isStudentUnion } from '@alehuo/clubhouse-shared';
import { ThunkDispatch } from 'redux-thunk';
import { action } from 'typesafe-actions';
import StudentUnionService from '../../services/StudentUnionService';
import {
    ADD_STUDENT_UNION_FORM_MODAL_OPEN,
    ADD_STUDENT_UNION_TO_LIST,
    DELETE_STUDENT_UNION,
    SET_ADDING_STUDENT_UNION,
    SET_STUDENT_UNIONS,
} from '../constants';
import { errorMessage, successMessage } from './notificationActions';

export const setStudentUnions = (studentUnions: any[]) => action(SET_STUDENT_UNIONS, { studentUnions });

export const fetchStudentUnions = (token: string) => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        try {
            const res = await StudentUnionService.getStudentUnions(token);
            if (res.payload !== undefined) {
                const stdus = res.payload;
                if (stdus.every(isStudentUnion)) {
                    dispatch(setStudentUnions(stdus));
                } else {
                    dispatch(errorMessage('Back-end returned invalid student unions'));
                }
            } else {
                console.error('Response payload was undefined.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                const res = err.response.data as ApiResponse<undefined>;
                if (res.error !== undefined) {
                    dispatch(errorMessage(res.error.message));
                }
            } else {
                // If the response doesn't contain an error key, the back-end might be down
                dispatch(errorMessage('Error fetching student unions'));
            }
        }
    };
};

export const setAdding = (isAdding: boolean) => action(SET_ADDING_STUDENT_UNION, { isAdding });

export const addFormModalOpen = (status: boolean) => action(ADD_STUDENT_UNION_FORM_MODAL_OPEN, { status });

export const addStudentUnionToList = (stdu: any) => action(ADD_STUDENT_UNION_TO_LIST, { stdu });

export const addStudentUnion = (stdu: any, token: string) => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(setAdding(true));
        try {
            const res = await StudentUnionService.addStudentUnion(stdu, token);
            if (res.payload !== undefined) {
                const addedUnion = res.payload;
                if (isStudentUnion(addedUnion)) {
                    dispatch(addStudentUnionToList(addedUnion));
                    dispatch(successMessage('New student union added successfully'));
                } else {
                    dispatch(errorMessage('Back-end returned a malformed student union.'));
                }
            } else {
                console.log('Response payload was undefined.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                const res = err.response.data as ApiResponse<undefined>;
                if (res.error !== undefined) {
                    dispatch(errorMessage(res.error.message));
                }
            } else {
                // If the response doesn't contain an error key, the back-end might be down
                dispatch(errorMessage('Error adding student union'));
            }
        }
        dispatch(setAdding(false));
        dispatch(addFormModalOpen(false));
    };
};

export const deleteStudentUnionFromList = (unionId: number) => action(DELETE_STUDENT_UNION, { unionId });

export const deleteStudentUnion = (unionId: number, token: string) => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        try {
            await StudentUnionService.deleteStudentUnion(unionId, token);
            dispatch(deleteStudentUnionFromList(unionId));
            dispatch(successMessage('Student union deleted successfully'));
        } catch (err) {
            if (err.response && err.response.data) {
                const res = err.response.data as ApiResponse<undefined>;
                if (res.error !== undefined) {
                    dispatch(errorMessage(res.error.message));
                }
            } else {
                // If the response doesn't contain an error key, the back-end might be down
                dispatch(errorMessage('Error deleting student union'));
            }
        }
    };
};
