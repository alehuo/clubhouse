declare const userCrud: {
    ALLOW_ADD_USER: {
        name: string;
        value: number;
    };
    ALLOW_EDIT_USER: {
        name: string;
        value: number;
    };
    ALLOW_DELETE_USER: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_USERS: {
        name: string;
        value: number;
    };
};
declare const keyCrud: {
    ALLOW_ADD_KEYS: {
        name: string;
        value: number;
    };
    ALLOW_REMOVE_KEYS: {
        name: string;
        value: number;
    };
    ALLOW_EDIT_KEYS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_KEYS: {
        name: string;
        value: number;
    };
};
declare const studentUnionCrud: {
    ALLOW_ADD_STUDENT_UNION: {
        name: string;
        value: number;
    };
    ALLOW_REMOVE_STUDENT_UNION: {
        name: string;
        value: number;
    };
    ALLOW_EDIT_STUDENT_UNION: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_STUDENT_UNIONS: {
        name: string;
        value: number;
    };
};
declare const calendarCrud: {
    ALLOW_ADD_EVENT: {
        name: string;
        value: number;
    };
    ALLOW_EDIT_EVENT: {
        name: string;
        value: number;
    };
    ALLOW_REMOVE_EVENT: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_EVENTS: {
        name: string;
        value: number;
    };
};
declare const ruleCrud: {
    ALLOW_ADD_RULES: {
        name: string;
        value: number;
    };
    ALLOW_EDIT_RULES: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_RULES: {
        name: string;
        value: number;
    };
    ALLOW_REMOVE_RULES: {
        name: string;
        value: number;
    };
};
declare const newspostCrud: {
    ALLOW_ADD_POSTS: {
        name: string;
        value: number;
    };
    ALLOW_REMOVE_POSTS: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_POSTS: {
        name: string;
        value: number;
    };
    ALLOW_EDIT_POSTS: {
        name: string;
        value: number;
    };
};
declare const locationCrud: {
    ALLOW_ADD_LOCATION: {
        name: string;
        value: number;
    };
    ALLOW_EDIT_LOCATION: {
        name: string;
        value: number;
    };
    ALLOW_DELETE_LOCATION: {
        name: string;
        value: number;
    };
    ALLOW_VIEW_LOCATIONS: {
        name: string;
        value: number;
    };
};
declare const userPermissions: typeof userCrud & typeof keyCrud & typeof studentUnionCrud & typeof calendarCrud & typeof ruleCrud & typeof newspostCrud & typeof locationCrud;
export default userPermissions;
//# sourceMappingURL=Permissions.d.ts.map