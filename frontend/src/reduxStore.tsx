import createSagaMiddleware from '@redux-saga/core';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { StateType } from 'typesafe-actions';
import authenticationReducer from './reducers/authenticationReducer';
import calendarReducer from './reducers/calendarReducer';
import keyReducer from './reducers/keyReducer';
import { logger } from './reducers/middleware';
import newsReducer from './reducers/newsReducer';
import notificationReducer from './reducers/notificationReducer';
import rootReducer from './reducers/rootReducer';
import ruleReducer from './reducers/ruleReducer';
import sessionReducer from './reducers/sessionReducer';
import studentUnionReducer from './reducers/studentUnionReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import notificationSaga from './sagas/NotificationSaga';
import rootSaga from './sagas/RootSaga';
import sessionSaga from './sagas/SessionSaga';
import userSaga from './sagas/UserSaga';

const reducerObj = (history: History) => ({
    root: rootReducer,
    calendar: calendarReducer,
    auth: authenticationReducer,
    user: userReducer,
    notification: notificationReducer,
    key: keyReducer,
    studentUnion: studentUnionReducer,
    session: sessionReducer,
    form: formReducer,
    rule: ruleReducer,
    news: newsReducer,
    router: connectRouter(history),
    ui: uiReducer,
});

const reducer = (history: History) => combineReducers(reducerObj(history));

const history = createBrowserHistory();
export type RootState = StateType<ReturnType<typeof reducer>>;

const sagaMiddleware = createSagaMiddleware();

const middleware = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return [thunk, sagaMiddleware, routerMiddleware(history)];
        case 'development':
            return [thunk, sagaMiddleware, routerMiddleware(history), logger];
        case 'test':
            return [thunk, sagaMiddleware, routerMiddleware(history)];
        default:
            return [thunk, sagaMiddleware, routerMiddleware(history)];
    }
};

const reduxStore = createStore(reducer(history), composeWithDevTools(applyMiddleware(...middleware())));

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(notificationSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(sessionSaga);

export { reduxStore, history };
