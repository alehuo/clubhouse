import { StudentUnion } from '@alehuo/clubhouse-shared';
import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as studentUnionActions from './actions/studentUnionActions';
import {
    ADD_STUDENT_UNION_FORM_MODAL_OPEN,
    ADD_STUDENT_UNION_TO_LIST,
    DELETE_STUDENT_UNION,
    SET_ADDING_STUDENT_UNION,
    SET_STUDENT_UNIONS,
} from './constants';

export interface StudentUnionState {
    readonly studentUnions: StudentUnion[];
    readonly isAdding: boolean;
    readonly modalOpen: boolean;
}

const initialState: StudentUnionState = {
    studentUnions: [],
    isAdding: false,
    modalOpen: false,
};

export type StudentUnionAction = ActionType<typeof studentUnionActions>;

const studentUnionReducer: Reducer<StudentUnionState, StudentUnionAction> = (state = initialState, action) => {
    switch (action.type) {
        case SET_STUDENT_UNIONS:
            return { ...{}, ...state, studentUnions: action.payload.studentUnions };
        case SET_ADDING_STUDENT_UNION:
            return { ...{}, ...state, isAdding: action.payload.isAdding };
        case ADD_STUDENT_UNION_FORM_MODAL_OPEN:
            return { ...{}, ...state, modalOpen: action.payload.status };
        case ADD_STUDENT_UNION_TO_LIST:
            return {
                ...{},
                ...state,
                studentUnions: [...state.studentUnions, action.payload.stdu],
            };
        case DELETE_STUDENT_UNION:
            return {
                ...{},
                ...state,
                studentUnions: state.studentUnions.filter(
                    studentUnion => studentUnion.unionId !== action.payload.unionId,
                ),
            };
        default:
            return state;
    }
};

export default studentUnionReducer;
