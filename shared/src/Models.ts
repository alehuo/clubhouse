export interface DbUser extends User {
  password: string;
  hidden?: boolean;
}

export interface User {
  userId?: number;
  email: string;
  firstName: string;
  lastName: string;
  permissions?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CalendarEvent {
  eventId?: number;
  name: string;
  description: string;
  locationId?: number;
  restricted: boolean;
  startTime: Date;
  endTime: Date;
  addedBy: number;
  unionId: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Location {
  locationId?: number;
  name: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Message {
  messageId?: number;
  userId: number;
  title?: string;
  message: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Newspost {
  postId?: number;
  author: number;
  title: string;
  message: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Permission {
  permissionId?: number;
  name: string;
  value: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Session {
  sessionId?: number;
  userId?: number;
  startTime?: Date;
  endTime?: Date;
  startMessage?: string;
  endMessage?: string;
  started?: boolean;
  ended?: boolean;
  created_at?: Date;
  updated_at?: Date;
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
  unionId?: number;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserStatistics {
  newspostCount: number;
  messageCount: number;
  watchCount: number;
  hoursOnWatch: number;
  eventCount: number;
}
