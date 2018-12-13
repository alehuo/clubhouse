"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = (x) => typeof x === "string";
exports.isNumber = (x) => typeof x === "number";
exports.isBoolean = (x) => typeof x === "boolean";
exports.isObject = (x) => typeof x === "object";
exports.isDbUser = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const usr = x;
    if (usr.created_at &&
        usr.email &&
        usr.firstName &&
        usr.lastName &&
        usr.permissions &&
        usr.updated_at &&
        usr.userId &&
        usr.password &&
        usr.hidden) {
        if (exports.isString(usr.created_at) &&
            exports.isString(usr.email) &&
            exports.isString(usr.firstName) &&
            exports.isString(usr.lastName) &&
            exports.isNumber(usr.permissions) &&
            exports.isString(usr.updated_at) &&
            exports.isNumber(usr.userId) &&
            exports.isString(usr.password) &&
            exports.isNumber(usr.hidden) &&
            (usr.hidden === 1 || usr.hidden === 0)) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
};
exports.isUser = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const usr = x;
    if (usr.created_at &&
        usr.email &&
        usr.firstName &&
        usr.lastName &&
        usr.permissions &&
        usr.updated_at &&
        usr.userId) {
        if (exports.isString(usr.created_at) &&
            exports.isString(usr.email) &&
            exports.isString(usr.firstName) &&
            exports.isString(usr.lastName) &&
            exports.isNumber(usr.permissions) &&
            exports.isString(usr.updated_at) &&
            exports.isNumber(usr.userId)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isCalendarEvent = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const cal = x;
    if (cal.addedBy !== undefined &&
        cal.created_at !== undefined &&
        cal.description !== undefined &&
        cal.endTime !== undefined &&
        cal.eventId !== undefined &&
        cal.locationId !== undefined &&
        cal.name !== undefined &&
        cal.restricted !== undefined &&
        cal.startTime !== undefined &&
        cal.unionId !== undefined &&
        cal.updated_at !== undefined) {
        if (exports.isNumber(cal.addedBy) &&
            exports.isString(cal.created_at) &&
            exports.isString(cal.description) &&
            exports.isString(cal.endTime) &&
            exports.isNumber(cal.eventId) &&
            exports.isNumber(cal.locationId) &&
            exports.isString(cal.name) &&
            exports.isNumber(cal.restricted) &&
            exports.isString(cal.startTime) &&
            exports.isNumber(cal.unionId) &&
            exports.isString(cal.updated_at)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isLocation = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const l = x;
    if (l.address && l.created_at && l.locationId && l.name && l.updated_at) {
        if (exports.isString(l.address) &&
            exports.isString(l.created_at) &&
            exports.isNumber(l.locationId) &&
            exports.isString(l.name) &&
            exports.isString(l.updated_at)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isMessage = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const m = x;
    if (m.created_at &&
        m.message &&
        m.messageId &&
        m.title &&
        m.updated_at &&
        m.userId) {
        if (exports.isString(m.created_at) &&
            exports.isString(m.message) &&
            exports.isNumber(m.messageId) &&
            exports.isString(m.title) &&
            exports.isString(m.updated_at) &&
            exports.isNumber(m.userId)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isNewspost = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const n = x;
    if (n.author &&
        n.created_at &&
        n.message &&
        n.postId &&
        n.title &&
        n.updated_at) {
        if (exports.isString(n.author) &&
            exports.isString(n.created_at) &&
            exports.isString(n.message) &&
            exports.isNumber(n.postId) &&
            exports.isString(n.title) &&
            exports.isString(n.updated_at)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isPermission = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const p = x;
    if (p.created_at && p.name && p.permissionId && p.updated_at && p.value) {
        if (exports.isString(p.created_at) &&
            exports.isString(p.name) &&
            exports.isNumber(p.permissionId) &&
            exports.isString(p.updated_at) &&
            exports.isNumber(p.value)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isSession = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const s = x;
    if (s.created_at !== undefined &&
        s.endMessage !== undefined &&
        s.endTime !== undefined &&
        s.ended !== undefined &&
        s.sessionId !== undefined &&
        s.startMessage !== undefined &&
        s.startTime !== undefined &&
        s.started !== undefined &&
        s.updated_at !== undefined &&
        s.userId !== undefined) {
        if (exports.isString(s.created_at) &&
            exports.isString(s.endMessage) &&
            exports.isString(s.endTime) &&
            (exports.isNumber(s.ended) && (s.ended === 1 || s.ended === 0)) &&
            exports.isNumber(s.sessionId) &&
            exports.isString(s.startMessage) &&
            exports.isString(s.startTime) &&
            exports.isString(s.started) &&
            exports.isString(s.updated_at) &&
            exports.isNumber(s.userId)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isStatistics = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const s = x;
    if (s.eventCount &&
        s.hoursOnWatch &&
        s.messageCount &&
        s.newspostCount &&
        s.userCount &&
        s.watchCount) {
        if (exports.isNumber(s.eventCount) &&
            exports.isNumber(s.hoursOnWatch) &&
            exports.isNumber(s.messageCount) &&
            exports.isNumber(s.newspostCount) &&
            exports.isNumber(s.userCount) &&
            exports.isNumber(s.watchCount)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isStudentUnion = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const s = x;
    if (s.created_at && s.description && s.name && s.unionId && s.updated_at) {
        if (exports.isString(s.created_at) &&
            exports.isString(s.description) &&
            exports.isNumber(s.unionId) &&
            exports.isString(s.updated_at)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isUserStatistics = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const s = x;
    if (s.eventCount &&
        s.hoursOnWatch &&
        s.messageCount &&
        s.newspostCount &&
        s.watchCount) {
        if (exports.isNumber(s.eventCount) &&
            exports.isNumber(s.hoursOnWatch) &&
            exports.isNumber(s.messageCount) &&
            exports.isNumber(s.newspostCount) &&
            exports.isNumber(s.watchCount)) {
            return true;
        }
        return false;
    }
    return false;
};
//# sourceMappingURL=Models.js.map