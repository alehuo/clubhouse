declare const userCrud: {
    ALLOW_REMOVE_USER: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_USERS: {
        name: string;
        value: number;
    };
};
declare const keyCrud: {
    ALLOW_ADD_REMOVE_KEYS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_KEYS: {
        name: string;
        value: number;
    };
};
declare const studentUnionCrud: {
    ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_STUDENT_UNIONS: {
        name: string;
        value: number;
    };
};
declare const calendarCrud: {
    ALLOW_ADD_EDIT_REMOVE_EVENTS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_EVENTS: {
        name: string;
        value: number;
    };
};
declare const ruleCrud: {
    ALLOW_ADD_EDIT_REMOVE_RULES: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_RULES: {
        name: string;
        value: number;
    };
};
declare const newspostCrud: {
    ALLOW_ADD_EDIT_REMOVE_POSTS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_POSTS: {
        name: string;
        value: number;
    };
};
declare const locationCrud: {
    ALLOW_ADD_EDIT_REMOVE_LOCATIONS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_LOCATIONS: {
        name: string;
        value: number;
    };
};
declare const messageCrud: {
    ALLOW_ADD_EDIT_REMOVE_MESSAGES: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_LOCATIONS: {
        name: string;
        value: number;
    };
};
declare const permissionCrud: {
    ALLOW_ADD_EDIT_REMOVE_PERMISSIONS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_PERMISSIONS: {
        name: string;
        value: number;
    };
};
declare const permissions: typeof userCrud & typeof keyCrud & typeof studentUnionCrud & typeof calendarCrud & typeof ruleCrud & typeof newspostCrud & typeof locationCrud & typeof messageCrud & typeof permissionCrud;
export default permissions;
//# sourceMappingURL=Permissions.d.ts.map