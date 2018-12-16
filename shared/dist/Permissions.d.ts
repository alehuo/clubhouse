declare enum UserPermissions {
    ALLOW_REMOVE_USER,
    ALLOW_VIEW_USERS
}
declare enum KeyPermissions {
    ALLOW_ADD_REMOVE_KEYS,
    ALLOW_VIEW_KEYS
}
declare enum StudentUnionPermissions {
    ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS,
    ALLOW_VIEW_STUDENT_UNIONS
}
declare enum CalendarPermissions {
    ALLOW_ADD_EDIT_REMOVE_EVENTS,
    ALLOW_VIEW_EVENTS
}
declare enum RulePermissions {
    ALLOW_ADD_EDIT_REMOVE_RULES,
    ALLOW_VIEW_RULES
}
declare enum NewspostPermissions {
    ALLOW_ADD_EDIT_REMOVE_POSTS,
    ALLOW_VIEW_POSTS
}
declare enum LocationPermissions {
    ALLOW_ADD_EDIT_REMOVE_LOCATIONS,
    ALLOW_VIEW_LOCATIONS
}
declare enum MessagePermissions {
    ALLOW_ADD_EDIT_REMOVE_MESSAGES,
    ALLOW_VIEW_LOCATIONS
}
declare enum MiscPermissions {
    ALLOW_ADD_EDIT_REMOVE_PERMISSIONS,
    ALLOW_VIEW_PERMISSIONS
}
declare const permissions: {
    [x: number]: string;
    ALLOW_ADD_EDIT_REMOVE_PERMISSIONS: MiscPermissions;
    ALLOW_VIEW_PERMISSIONS: MiscPermissions;
    ALLOW_ADD_EDIT_REMOVE_MESSAGES: MessagePermissions;
    ALLOW_VIEW_LOCATIONS: MessagePermissions;
    ALLOW_ADD_EDIT_REMOVE_LOCATIONS: LocationPermissions;
    ALLOW_ADD_EDIT_REMOVE_POSTS: NewspostPermissions;
    ALLOW_VIEW_POSTS: NewspostPermissions;
    ALLOW_ADD_EDIT_REMOVE_RULES: RulePermissions;
    ALLOW_VIEW_RULES: RulePermissions;
    ALLOW_ADD_EDIT_REMOVE_EVENTS: CalendarPermissions;
    ALLOW_VIEW_EVENTS: CalendarPermissions;
    ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS: StudentUnionPermissions;
    ALLOW_VIEW_STUDENT_UNIONS: StudentUnionPermissions;
    ALLOW_ADD_REMOVE_KEYS: KeyPermissions;
    ALLOW_VIEW_KEYS: KeyPermissions;
    ALLOW_REMOVE_USER: UserPermissions;
    ALLOW_VIEW_USERS: UserPermissions;
};
export default permissions;
//# sourceMappingURL=Permissions.d.ts.map