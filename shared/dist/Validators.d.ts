import { CalendarEvent, DbUser, Location, Message, Newspost, Rule, Session, Statistics, StudentUnion, User, UserStatistics } from "./Models";
export declare type Validator<T> = (x: unknown) => x is T;
export declare const isString: (x: unknown) => x is string;
export declare const isNumber: (x: unknown) => x is number;
export declare const isBoolean: (x: unknown) => x is boolean;
export declare const isObject: (x: unknown) => x is object;
export declare const isDbUser: Validator<DbUser>;
export declare const isUser: Validator<User>;
export declare const isCalendarEvent: Validator<CalendarEvent>;
export declare const isLocation: Validator<Location>;
export declare const isMessage: Validator<Message>;
export declare const isNewspost: Validator<Newspost>;
export declare const isSession: Validator<Session>;
export declare const isStatistics: Validator<Statistics>;
export declare const isStudentUnion: Validator<StudentUnion>;
export declare const isUserStatistics: Validator<UserStatistics>;
export declare const ruleValidator: Validator<Rule>;
//# sourceMappingURL=Validators.d.ts.map