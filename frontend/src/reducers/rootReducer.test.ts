import { setAppLoadingState } from './actions/rootActions';
import rootReducer, { RootState } from './rootReducer';

describe('rootReducer', () => {
    it('Initial state should be correct', () => {
        // @ts-ignore
        expect(rootReducer(undefined, {})).toMatchObject({
            appLoading: true,
        });
    });
    it('Action SET_APP_LOADED should set appLoading value correctly (false)', () => {
        expect(rootReducer(undefined, setAppLoadingState(false))).toMatchObject<RootState>({
            appLoading: false,
        });
    });
    it('Action SET_APP_LOADED should set appLoading value correctly (true)', () => {
        expect(rootReducer(undefined, setAppLoadingState(true))).toMatchObject<RootState>({
            appLoading: true,
        });
    });
});
