import { SET_APP_LOADED } from '../constants';
import { setAppLoadingState } from './rootActions';

describe('Root actions', () => {
    it('Should create an action to set the app loaded', () => {
        const expectedAction: ReturnType<typeof setAppLoadingState> = {
            type: SET_APP_LOADED,
            payload: {
                val: true,
            },
        };
        expect(setAppLoadingState(true)).toEqual(expectedAction);
    });
});
