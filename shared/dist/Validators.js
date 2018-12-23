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
    if (usr.created_at !== undefined &&
        usr.email !== undefined &&
        usr.firstName !== undefined &&
        usr.lastName !== undefined &&
        usr.permissions !== undefined &&
        usr.updated_at !== undefined &&
        usr.userId !== undefined &&
        usr.password !== undefined) {
        if (exports.isString(usr.created_at) &&
            exports.isString(usr.email) &&
            exports.isString(usr.firstName) &&
            exports.isString(usr.lastName) &&
            exports.isNumber(usr.permissions) &&
            exports.isString(usr.updated_at) &&
            exports.isNumber(usr.userId) &&
            exports.isString(usr.password)) {
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
    if (usr.created_at !== undefined &&
        usr.email !== undefined &&
        usr.firstName !== undefined &&
        usr.lastName !== undefined &&
        usr.permissions !== undefined &&
        usr.updated_at !== undefined &&
        usr.userId !== undefined) {
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
    if (l.address !== undefined &&
        l.created_at !== undefined &&
        l.locationId !== undefined &&
        l.name !== undefined &&
        l.updated_at !== undefined) {
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
    if (m.created_at !== undefined &&
        m.message !== undefined &&
        m.messageId !== undefined &&
        m.title !== undefined &&
        m.updated_at !== undefined &&
        m.userId !== undefined) {
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
    if (n.author !== undefined &&
        n.created_at !== undefined &&
        n.message !== undefined &&
        n.postId !== undefined &&
        n.title !== undefined &&
        n.updated_at !== undefined) {
        if (exports.isNumber(n.author) &&
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
            exports.isNumber(s.started) &&
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
    if (s.eventCount !== undefined &&
        s.hoursOnWatch !== undefined &&
        s.messageCount !== undefined &&
        s.newspostCount !== undefined &&
        s.userCount !== undefined &&
        s.watchCount !== undefined) {
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
    if (s.created_at !== undefined &&
        s.description !== undefined &&
        s.name !== undefined &&
        s.unionId !== undefined &&
        s.updated_at !== undefined) {
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
    if (s.eventCount !== undefined &&
        s.hoursOnWatch !== undefined &&
        s.messageCount !== undefined &&
        s.newspostCount !== undefined &&
        s.watchCount !== undefined) {
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
exports.isRule = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const s = x;
    if (s.order !== undefined &&
        s.ruleId !== undefined &&
        s.text !== undefined &&
        s.created_at !== undefined &&
        s.updated_at !== undefined) {
        if (exports.isNumber(s.ruleId) &&
            exports.isNumber(s.order) &&
            exports.isString(s.text) &&
            exports.isString(s.created_at) &&
            exports.isString(s.updated_at)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isKeyType = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const k = x;
    if (k.keyTypeId !== undefined &&
        k.title !== undefined &&
        k.created_at !== undefined &&
        k.updated_at !== undefined) {
        if (exports.isNumber(k.keyTypeId) &&
            exports.isString(k.title) &&
            exports.isString(k.created_at) &&
            exports.isString(k.updated_at)) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isKey = (x) => {
    if (!exports.isObject(x)) {
        return false;
    }
    const k = x;
    if (k.userId !== undefined &&
        k.keyId !== undefined &&
        k.keyType !== undefined &&
        k.unionId !== undefined &&
        k.dateAssigned !== undefined &&
        k.created_at !== undefined &&
        k.updated_at !== undefined &&
        k.description !== undefined) {
        if (exports.isNumber(k.userId) &&
            exports.isNumber(k.keyId) &&
            exports.isNumber(k.keyType) &&
            exports.isNumber(k.unionId) &&
            exports.isString(k.dateAssigned) &&
            exports.isString(k.created_at) &&
            exports.isString(k.updated_at) &&
            exports.isString(k.description)) {
            return true;
        }
        return false;
    }
    return false;
};
//# sourceMappingURL=Validators.js.map