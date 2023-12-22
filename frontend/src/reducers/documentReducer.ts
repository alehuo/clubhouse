import { isDocument, Document } from '@alehuo/clubhouse-shared';
import { Reducer } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import DocumentService from '../services/DocumentService';
import { errorMessage } from './actions/notificationActions';

export interface DocumentState {
    readonly documents: Document[];
    readonly editMode: boolean;
}

const initialState: DocumentState = {
    documents: [],
    editMode: false,
};

export const documentActions = {
    SET_DOCUMENTS: 'SET_DOCUMENTS',
    MOVE_UP: 'MOVE_UP',
    MOVE_DOWN: 'MOVE_DOWN',
    TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE',
    TOGGLE_SINGLE_DOCUMENT_EDIT_MODE: 'TOGGLE_SINGLE_DOCUMENT_EDIT_MODE',
};

export const setDocuments = (documents: Document[]) => {
    return {
        type: documentActions.SET_DOCUMENTS,
        documents,
    };
};

export const toggleEditMode = () => {
    return {
        type: documentActions.TOGGLE_EDIT_MODE,
    };
};

export const fetchDocuments = () => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        try {
            const res = await DocumentService.getDocuments();
            if (res.payload !== undefined) {
                const documents = res.payload;
                if (documents.every(isDocument)) {
                    dispatch(setDocuments(res.payload));
                } else {
                    dispatch(errorMessage('Back-end returned malformed documents'));
                }
            } else {
                console.error('Response payload was undefined.');
            }
        } catch (err) {
            // TODO: Proper error handling
            console.error(err);
        }
    };
};

export const moveDocumentUp = (id: number) => {
    return {
        type: documentActions.MOVE_UP,
        id,
    };
};

export const moveDocumentDown = (id: number) => {
    return {
        type: documentActions.MOVE_DOWN,
        id,
    };
};

const documentReducer: Reducer<DocumentState, any> = (state = initialState, action) => {
    switch (action.type) {
        case documentActions.SET_DOCUMENTS:
            return { ...{}, ...state, ...{ rules: action.rules } };
        case documentActions.MOVE_DOWN:
            const downIndex = state.documents.findIndex(doc => doc.documentId === action.id);
            const rules = [...state.documents];
            const tmp1 = rules[downIndex + 1];
            rules[downIndex + 1] = rules[downIndex];
            rules[downIndex] = tmp1;
            return { ...state, ...{ rules } };
        case documentActions.MOVE_UP:
            const upIndex = state.documents.findIndex(doc => doc.documentId === action.id);
            const rules1 = [...state.documents];
            const tmp2 = rules1[upIndex - 1];
            rules1[upIndex - 1] = rules1[upIndex];
            rules1[upIndex] = tmp2;
            return { ...state, ...{ rules: rules1 } };
        case documentActions.TOGGLE_EDIT_MODE:
            return { ...state, ...{ editMode: !state.editMode } };
        default:
            return state;
    }
};

export default documentReducer;
