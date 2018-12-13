export declare type Validator<T> = (x: unknown) => x is T;
export interface DbUser extends User {
    password: string;
    hidden: 0 | 1;
}
export declare const isString: (x: unknown) => x is string;
export declare const isNumber: (x: unknown) => x is number;
export declare const isBoolean: (x: unknown) => x is boolean;
export declare const isObject: (x: unknown) => x is object;
export declare const isDbUser: Validator<DbUser>;
export interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    permissions: number;
    created_at: string;
    updated_at: string;
}
export declare const isUser: Validator<User>;
export interface CalendarEvent {
    eventId: number;
    name: string;
    description: string;
    locationId: number;
    restricted: 0 | 1;
    startTime: string;
    endTime: string;
    addedBy: number;
    unionId: number;
    created_at: string;
    updated_at: string;
}
export declare const isCalendarEvent: Validator<CalendarEvent>;
export interface Location {
    locationId: number;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
}
export declare const isLocation: Validator<Location>;
export interface Message {
    messageId: number;
    userId: number;
    title: string;
    message: string;
    created_at: string;
    updated_at: string;
}
export declare const isMessage: Validator<Message>;
export interface Newspost {
    postId: number;
    author: number;
    title: string;
    message: string;
    created_at: string;
    updated_at: string;
}
export declare const isNewspost: Validator<Newspost>;
export interface Permission {
    permissionId: number;
    name: string;
    value: number;
    created_at: string;
    updated_at: string;
}
export declare const isPermission: Validator<Permission>;
export interface Session {
    sessionId: number;
    userId: number;
    startTime: string;
    endTime: string;
    startMessage: string;
    endMessage: string;
    started: 0 | 1;
    ended: 0 | 1;
    created_at: string;
    updated_at: string;
}
export declare const isSession: Validator<Session>;
export interface Statistics {
    newspostCount: number;
    messageCount: number;
    watchCount: number;
    userCount: number;
    hoursOnWatch: number;
    eventCount: number;
}
export declare const isStatistics: Validator<Statistics>;
export interface StudentUnion {
    unionId: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
export declare const isStudentUnion: Validator<StudentUnion>;
export interface UserStatistics {
    newspostCount: number;
    messageCount: number;
    watchCount: number;
    hoursOnWatch: number;
    eventCount: number;
}
export declare const isUserStatistics: Validator<UserStatistics>;
//# sourceMappingURL=Models.d.ts.map