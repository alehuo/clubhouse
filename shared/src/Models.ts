export type Validator<T> = (x: unknown) => x is T;

export interface DbUser extends User {
  password: string;
  hidden: 0 | 1;
}

export const isString = (x: unknown): x is string => typeof x === "string";
export const isNumber = (x: unknown): x is number => typeof x === "number";
export const isBoolean = (x: unknown): x is boolean => typeof x === "boolean";
export const isObject = (x: unknown): x is object => typeof x === "object";

export const isDbUser: Validator<DbUser> = (x): x is DbUser => {
  if (!isObject(x)) {
    return false;
  }
  const usr = x as DbUser;
  if (
    usr.created_at !== undefined &&
    usr.email !== undefined &&
    usr.firstName !== undefined &&
    usr.lastName !== undefined &&
    usr.permissions !== undefined &&
    usr.updated_at !== undefined &&
    usr.userId !== undefined &&
    usr.password !== undefined &&
    usr.hidden !== undefined
  ) {
    if (
      isString(usr.created_at) &&
      isString(usr.email) &&
      isString(usr.firstName) &&
      isString(usr.lastName) &&
      isNumber(usr.permissions) &&
      isString(usr.updated_at) &&
      isNumber(usr.userId) &&
      isString(usr.password) &&
      (isNumber(usr.hidden) && (usr.hidden === 1 || usr.hidden === 0))
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  permissions: number;
  created_at: string;
  updated_at: string;
}

export const isUser: Validator<User> = (x): x is User => {
  if (!isObject(x)) {
    return false;
  }
  const usr = x as User;
  if (
    usr.created_at !== undefined &&
    usr.email !== undefined &&
    usr.firstName !== undefined &&
    usr.lastName !== undefined &&
    usr.permissions !== undefined &&
    usr.updated_at !== undefined &&
    usr.userId !== undefined
  ) {
    if (
      isString(usr.created_at) &&
      isString(usr.email) &&
      isString(usr.firstName) &&
      isString(usr.lastName) &&
      isNumber(usr.permissions) &&
      isString(usr.updated_at) &&
      isNumber(usr.userId)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

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

export const isCalendarEvent: Validator<CalendarEvent> = (
  x,
): x is CalendarEvent => {
  if (!isObject(x)) {
    return false;
  }
  const cal = x as CalendarEvent;
  if (
    cal.addedBy !== undefined &&
    cal.created_at !== undefined &&
    cal.description !== undefined &&
    cal.endTime !== undefined &&
    cal.eventId !== undefined &&
    cal.locationId !== undefined &&
    cal.name !== undefined &&
    cal.restricted !== undefined &&
    cal.startTime !== undefined &&
    cal.unionId !== undefined &&
    cal.updated_at !== undefined
  ) {
    if (
      isNumber(cal.addedBy) &&
      isString(cal.created_at) &&
      isString(cal.description) &&
      isString(cal.endTime) &&
      isNumber(cal.eventId) &&
      isNumber(cal.locationId) &&
      isString(cal.name) &&
      isNumber(cal.restricted) &&
      isString(cal.startTime) &&
      isNumber(cal.unionId) &&
      isString(cal.updated_at)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export interface Location {
  locationId: number;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export const isLocation: Validator<Location> = (x): x is Location => {
  if (!isObject(x)) {
    return false;
  }
  const l = x as Location;
  if (
    l.address !== undefined &&
    l.created_at !== undefined &&
    l.locationId !== undefined &&
    l.name !== undefined &&
    l.updated_at !== undefined
  ) {
    if (
      isString(l.address) &&
      isString(l.created_at) &&
      isNumber(l.locationId) &&
      isString(l.name) &&
      isString(l.updated_at)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export interface Message {
  messageId: number;
  userId: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export const isMessage: Validator<Message> = (x): x is Message => {
  if (!isObject(x)) {
    return false;
  }
  const m = x as Message;
  if (
    m.created_at !== undefined &&
    m.message !== undefined &&
    m.messageId !== undefined &&
    m.title !== undefined &&
    m.updated_at !== undefined &&
    m.userId !== undefined
  ) {
    if (
      isString(m.created_at) &&
      isString(m.message) &&
      isNumber(m.messageId) &&
      isString(m.title) &&
      isString(m.updated_at) &&
      isNumber(m.userId)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export interface Newspost {
  postId: number;
  author: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export const isNewspost: Validator<Newspost> = (x): x is Newspost => {
  if (!isObject(x)) {
    return false;
  }
  const n = x as Newspost;
  if (
    n.author !== undefined &&
    n.created_at !== undefined &&
    n.message !== undefined &&
    n.postId !== undefined &&
    n.title !== undefined &&
    n.updated_at !== undefined
  ) {
    if (
      isString(n.author) &&
      isString(n.created_at) &&
      isString(n.message) &&
      isNumber(n.postId) &&
      isString(n.title) &&
      isString(n.updated_at)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export interface Permission {
  permissionId: number;
  name: string;
  value: number;
  created_at: string;
  updated_at: string;
}

export const isPermission: Validator<Permission> = (x): x is Permission => {
  if (!isObject(x)) {
    return false;
  }
  const p = x as Permission;
  if (
    p.created_at !== undefined &&
    p.name !== undefined &&
    p.permissionId !== undefined &&
    p.updated_at !== undefined &&
    p.value !== undefined
  ) {
    if (
      isString(p.created_at) &&
      isString(p.name) &&
      isNumber(p.permissionId) &&
      isString(p.updated_at) &&
      isNumber(p.value)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

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

export const isSession: Validator<Session> = (x): x is Session => {
  if (!isObject(x)) {
    return false;
  }
  const s = x as Session;
  if (
    s.created_at !== undefined &&
    s.endMessage !== undefined &&
    s.endTime !== undefined &&
    s.ended !== undefined &&
    s.sessionId !== undefined &&
    s.startMessage !== undefined &&
    s.startTime !== undefined &&
    s.started !== undefined &&
    s.updated_at !== undefined &&
    s.userId !== undefined
  ) {
    if (
      isString(s.created_at) &&
      isString(s.endMessage) &&
      isString(s.endTime) &&
      (isNumber(s.ended) && (s.ended === 1 || s.ended === 0)) &&
      isNumber(s.sessionId) &&
      isString(s.startMessage) &&
      isString(s.startTime) &&
      isString(s.started) &&
      isString(s.updated_at) &&
      isNumber(s.userId)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export interface Statistics {
  newspostCount: number;
  messageCount: number;
  watchCount: number;
  userCount: number;
  hoursOnWatch: number;
  eventCount: number;
}

export const isStatistics: Validator<Statistics> = (x): x is Statistics => {
  if (!isObject(x)) {
    return false;
  }
  const s = x as Statistics;
  if (
    s.eventCount !== undefined &&
    s.hoursOnWatch !== undefined &&
    s.messageCount !== undefined &&
    s.newspostCount !== undefined &&
    s.userCount !== undefined &&
    s.watchCount !== undefined
  ) {
    if (
      isNumber(s.eventCount) &&
      isNumber(s.hoursOnWatch) &&
      isNumber(s.messageCount) &&
      isNumber(s.newspostCount) &&
      isNumber(s.userCount) &&
      isNumber(s.watchCount)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export interface StudentUnion {
  unionId: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export const isStudentUnion: Validator<StudentUnion> = (
  x,
): x is StudentUnion => {
  if (!isObject(x)) {
    return false;
  }
  const s = x as StudentUnion;
  if (
    s.created_at !== undefined &&
    s.description !== undefined &&
    s.name !== undefined &&
    s.unionId !== undefined &&
    s.updated_at !== undefined
  ) {
    if (
      isString(s.created_at) &&
      isString(s.description) &&
      isNumber(s.unionId) &&
      isString(s.updated_at)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export interface UserStatistics {
  newspostCount: number;
  messageCount: number;
  watchCount: number;
  hoursOnWatch: number;
  eventCount: number;
}

export const isUserStatistics: Validator<UserStatistics> = (
  x: unknown,
): x is UserStatistics => {
  if (!isObject(x)) {
    return false;
  }
  const s = x as UserStatistics;
  if (
    s.eventCount !== undefined &&
    s.hoursOnWatch !== undefined &&
    s.messageCount !== undefined &&
    s.newspostCount !== undefined &&
    s.watchCount !== undefined
  ) {
    if (
      isNumber(s.eventCount) &&
      isNumber(s.hoursOnWatch) &&
      isNumber(s.messageCount) &&
      isNumber(s.newspostCount) &&
      isNumber(s.watchCount)
    ) {
      return true;
    }
    return false;
  }
  return false;
};
