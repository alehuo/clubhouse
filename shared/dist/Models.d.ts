export interface DbUser extends User {
    password: string;
}
export interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    permissions: number;
    created_at: string;
    updated_at: string;
}
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
export interface Location {
    locationId: number;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
}
export interface Message {
    messageId: number;
    userId: number;
    title: string;
    message: string;
    created_at: string;
    updated_at: string;
}
export interface Newspost {
    postId: number;
    author: number;
    title: string;
    message: string;
    created_at: string;
    updated_at: string;
}
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
export interface Statistics {
    newspostCount: number;
    messageCount: number;
    watchCount: number;
    userCount: number;
    hoursOnWatch: number;
    eventCount: number;
}
export interface StudentUnion {
    unionId: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
export interface UserStatistics {
    newspostCount: number;
    messageCount: number;
    watchCount: number;
    hoursOnWatch: number;
    eventCount: number;
}
export interface Rule {
    ruleId: number;
    order: number;
    text: string;
}
//# sourceMappingURL=Models.d.ts.map