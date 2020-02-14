import { ApiResponse, Key } from '@alehuo/clubhouse-shared';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { authenticateUser } from '../reducers/actions/authenticationActions';
import { setEvents } from '../reducers/actions/calendarActions';
import { setKeys } from '../reducers/actions/keyActions';
import { setNewsposts } from '../reducers/actions/newsActions';
import { errorMessage } from '../reducers/actions/notificationActions';
import { setAppLoadingState } from '../reducers/actions/rootActions';
import { setOwnSessionStatus } from '../reducers/actions/sessionActions';
import { fetchUserData, setUserPerms } from '../reducers/actions/userActions';
import { setDocuments } from '../reducers/documentReducer';
import CalendarService from '../services/CalendarService';
import KeyService from '../services/KeyService';
import NewsService from '../services/NewsService';
import PermissionService from '../services/PermissionService';
import SessionService from '../services/SessionService';
import DocumentService from '../services/DocumentService';
import { RootState } from '../reduxStore';

const getToken = (state: RootState) => state.auth.token;

function* fetchProtectedData() {
    try {
        const token = yield select(getToken);
        if (token !== null) {
            // Fetch & set keys
            const keys: ApiResponse<Key[]> = yield call(KeyService.getKeys, String(token));
            if (keys.payload !== undefined) {
                yield put(setKeys(keys.payload));
            } else {
                yield put(errorMessage('getKeys(): Response payload was undefined'));
            }

            // Fetch & set user permissions
            const userPerms: ApiResponse<{
                permissions: number;
                permission_list: string[];
            }> = yield call(PermissionService.getUserPermissions, String(token));

            if (userPerms.payload !== undefined) {
                yield put(setUserPerms(userPerms.payload.permissions));
            } else {
                yield put(errorMessage('getUserPermissions): Response payload was undefined'));
            }

            // Fetch & set sessions
            const sessions: ApiResponse<{
                running: boolean;
                peopleCount: number;
                startTime: string;
            }> = yield call(SessionService.getOwnSessionStatus, String(token));
            if (sessions.payload !== undefined) {
                yield put(
                    setOwnSessionStatus(
                        sessions.payload.running,
                        sessions.payload.peopleCount,
                        sessions.payload.startTime,
                    ),
                );
            } else {
                yield put(errorMessage('setOwnSessionStatus()): Response payload was undefined'));
            }
        } else {
            yield put(errorMessage('User is unauthenticated, cannot fetch protected data.'));
        }
    } catch (e) {
        yield put(errorMessage(e.message));
    }
}

function* initApp() {
    try {
        // Set app loading state
        yield put(setAppLoadingState(true));
        // Calendar events
        const eventResponse = yield call(CalendarService.getEvents);
        yield put(setEvents(eventResponse.payload));
        // Newsposts
        const newspostResponse = yield call(NewsService.getNewsposts);
        yield put(setNewsposts(newspostResponse.payload));
        // Rules
        const ruleResponse = yield call(DocumentService.getDocuments);
        yield put(setDocuments(ruleResponse.payload));

        // Get token from state
        const token = yield select(getToken);
        if (token !== null) {
            // If the user is authenticated, fetch protected data.
            yield call(fetchProtectedData);
            yield put(fetchUserData());
        }
    } catch (e) {
        yield put(errorMessage(e.message));
    }
    yield put(setAppLoadingState(false));
}

function* rootSaga() {
    yield takeEvery('INIT_APP', initApp);
}

export default rootSaga;
