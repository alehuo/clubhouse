import {
  CalendarEvent,
  DbUser,
  Location,
  Message,
  Newspost,
  Session,
  Statistics,
  StudentUnion,
  User,
  UserStatistics,
} from "./Models";

export const timestampFilter: (entity: any) => any = (entity: any): any => {
  if (entity.updated_at && entity.created_at) {
    const entity2: any = { ...entity };
    delete entity2.created_at;
    delete entity2.updated_at;
    return entity2;
  }
  return entity;
};

export const sessionFilter: (session: Session) => Session = (
  session: Session,
): Session => {
  if (!session.ended) {
    delete session.endTime;
  }
  if (!session.started) {
    delete session.startTime;
  }

  delete session.started;
  delete session.ended;

  return session;
};

export const userStatisticsFilter: (stats: UserStatistics) => UserStatistics = (
  stats: UserStatistics,
): UserStatistics => stats;

export const userFilter: (user: DbUser) => User = (user: DbUser): User => {
  return {
    userId: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    permissions: user.permissions,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

export const studentUnionFilter: (stdu: StudentUnion) => StudentUnion = (
  stdu: StudentUnion,
): StudentUnion => stdu;

export const statisticsFilter: (stats: Statistics) => Statistics = (
  stats: Statistics,
): Statistics => stats;

export const newsPostFilter: (post: Newspost) => Newspost = (
  post: Newspost,
): Newspost => post;

export const messageFilter: (message: Message) => Message = (
  message: Message,
): Message => message;

export const locationFilter: (location: Location) => Location = (
  location: Location,
): Location => location;

export const calendarEventFilter: (event: CalendarEvent) => CalendarEvent = (
  event: CalendarEvent,
): CalendarEvent => event;
