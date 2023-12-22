"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampFilter = (entity) => {
    if (entity.updated_at && entity.created_at) {
        const entity2 = Object.assign({}, entity);
        delete entity2.created_at;
        delete entity2.updated_at;
        return entity2;
    }
    return entity;
};
exports.sessionFilter = (session) => {
    if (!session.ended) {
        delete session.endTime;
    }
    if (!session.started) {
        delete session.startTime;
    }
    delete session.started;
    delete session.ended;
    return session;
};
exports.userStatisticsFilter = (stats) => stats;
exports.userFilter = (user) => {
    return {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        permissions: user.permissions,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
};
exports.studentUnionFilter = (stdu) => stdu;
exports.statisticsFilter = (stats) => stats;
exports.newsPostFilter = (post) => post;
exports.messageFilter = (message) => message;
exports.locationFilter = (location) => location;
exports.calendarEventFilter = (event) => event;
exports.documentFilter = (document) => document;
//# sourceMappingURL=Filters.js.map