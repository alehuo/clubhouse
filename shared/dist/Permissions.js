"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserPermissions;
(function (UserPermissions) {
    UserPermissions[UserPermissions["ALLOW_REMOVE_USER"] = Math.pow(2, 0)] = "ALLOW_REMOVE_USER";
    UserPermissions[UserPermissions["ALLOW_VIEW_USERS"] = Math.pow(2, 1)] = "ALLOW_VIEW_USERS";
})(UserPermissions = exports.UserPermissions || (exports.UserPermissions = {}));
var KeyPermissions;
(function (KeyPermissions) {
    KeyPermissions[KeyPermissions["ALLOW_ADD_REMOVE_KEYS"] = Math.pow(2, 2)] = "ALLOW_ADD_REMOVE_KEYS";
    KeyPermissions[KeyPermissions["ALLOW_VIEW_KEYS"] = Math.pow(2, 3)] = "ALLOW_VIEW_KEYS";
})(KeyPermissions = exports.KeyPermissions || (exports.KeyPermissions = {}));
var StudentUnionPermissions;
(function (StudentUnionPermissions) {
    StudentUnionPermissions[StudentUnionPermissions["ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS"] = Math.pow(2, 4)] = "ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS";
    StudentUnionPermissions[StudentUnionPermissions["ALLOW_VIEW_STUDENT_UNIONS"] = Math.pow(2, 5)] = "ALLOW_VIEW_STUDENT_UNIONS";
})(StudentUnionPermissions = exports.StudentUnionPermissions || (exports.StudentUnionPermissions = {}));
var CalendarPermissions;
(function (CalendarPermissions) {
    CalendarPermissions[CalendarPermissions["ALLOW_ADD_EDIT_REMOVE_EVENTS"] = Math.pow(2, 6)] = "ALLOW_ADD_EDIT_REMOVE_EVENTS";
    CalendarPermissions[CalendarPermissions["ALLOW_VIEW_EVENTS"] = Math.pow(2, 7)] = "ALLOW_VIEW_EVENTS";
})(CalendarPermissions = exports.CalendarPermissions || (exports.CalendarPermissions = {}));
var RulePermissions;
(function (RulePermissions) {
    RulePermissions[RulePermissions["ALLOW_ADD_EDIT_REMOVE_RULES"] = Math.pow(2, 8)] = "ALLOW_ADD_EDIT_REMOVE_RULES";
    RulePermissions[RulePermissions["ALLOW_VIEW_RULES"] = Math.pow(2, 9)] = "ALLOW_VIEW_RULES";
})(RulePermissions = exports.RulePermissions || (exports.RulePermissions = {}));
var NewspostPermissions;
(function (NewspostPermissions) {
    NewspostPermissions[NewspostPermissions["ALLOW_ADD_EDIT_REMOVE_POSTS"] = Math.pow(2, 10)] = "ALLOW_ADD_EDIT_REMOVE_POSTS";
    NewspostPermissions[NewspostPermissions["ALLOW_VIEW_POSTS"] = Math.pow(2, 11)] = "ALLOW_VIEW_POSTS";
})(NewspostPermissions = exports.NewspostPermissions || (exports.NewspostPermissions = {}));
var LocationPermissions;
(function (LocationPermissions) {
    LocationPermissions[LocationPermissions["ALLOW_ADD_EDIT_REMOVE_LOCATIONS"] = Math.pow(2, 12)] = "ALLOW_ADD_EDIT_REMOVE_LOCATIONS";
    LocationPermissions[LocationPermissions["ALLOW_VIEW_LOCATIONS"] = Math.pow(2, 13)] = "ALLOW_VIEW_LOCATIONS";
})(LocationPermissions = exports.LocationPermissions || (exports.LocationPermissions = {}));
var MessagePermissions;
(function (MessagePermissions) {
    MessagePermissions[MessagePermissions["ALLOW_ADD_EDIT_REMOVE_MESSAGES"] = Math.pow(2, 14)] = "ALLOW_ADD_EDIT_REMOVE_MESSAGES";
    MessagePermissions[MessagePermissions["ALLOW_VIEW_LOCATIONS"] = Math.pow(2, 15)] = "ALLOW_VIEW_LOCATIONS";
})(MessagePermissions = exports.MessagePermissions || (exports.MessagePermissions = {}));
var MiscPermissions;
(function (MiscPermissions) {
    MiscPermissions[MiscPermissions["ALLOW_ADD_EDIT_REMOVE_PERMISSIONS"] = Math.pow(2, 16)] = "ALLOW_ADD_EDIT_REMOVE_PERMISSIONS";
    MiscPermissions[MiscPermissions["ALLOW_VIEW_PERMISSIONS"] = Math.pow(2, 17)] = "ALLOW_VIEW_PERMISSIONS";
})(MiscPermissions = exports.MiscPermissions || (exports.MiscPermissions = {}));
//# sourceMappingURL=Permissions.js.map