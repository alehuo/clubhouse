import { ADD_KEY_TO_LIST, SET_KEY_TYPES, SET_KEYS, TOGGLE_KEY_MODAL } from '../constants';
import { addKeyToList, setKeys, setKeyTypes, toggleModal } from './keyActions';

describe('Key actions', () => {
    it('Should create an action to toggle key modal (case 1)', () => {
        const expectedAction: ReturnType<typeof toggleModal> = {
            type: TOGGLE_KEY_MODAL,
            payload: {
                value: true,
            },
        };
        expect(toggleModal(true)).toEqual(expectedAction);
    });
    it('Should create an action to toggle key modal (case 2)', () => {
        const expectedAction: ReturnType<typeof toggleModal> = {
            type: TOGGLE_KEY_MODAL,
            payload: {
                value: false,
            },
        };
        expect(toggleModal(false)).toEqual(expectedAction);
    });
    it('Should create an action to set keys', () => {
        const expectedAction: ReturnType<typeof setKeys> = {
            type: SET_KEYS,
            payload: {
                keys: [],
            },
        };
        expect(setKeys([])).toEqual(expectedAction);
    });
    it('Should create an action to set key types', () => {
        const expectedAction: ReturnType<typeof setKeyTypes> = {
            type: SET_KEY_TYPES,
            payload: {
                keyTypes: [],
            },
        };
        expect(setKeyTypes([])).toEqual(expectedAction);
    });

    it('Should create an action for adding keys to the list', () => {
        const key = {
            keyId: 1,
            unionId: 1,
            keyType: 1,
            userId: 1,
            created_at: '',
            dateAssigned: '',
            description: '',
            updated_at: '',
        };
        const expectedAction: ReturnType<typeof addKeyToList> = {
            type: ADD_KEY_TO_LIST,
            payload: {
                key: { ...key },
            },
        };
        expect(addKeyToList({ ...key })).toEqual(expectedAction);
    });

    it('Should create an action for fetching keys', () => {
        // TODO: Implement
        expect(true).toEqual(true);
    });

    it('Should create an action for fetching key types', () => {
        // TODO: Implement
        expect(true).toEqual(true);
    });

    it('Should create an action for adding a key', () => {
        // TODO: Implement
        expect(true).toEqual(true);
    });
});
