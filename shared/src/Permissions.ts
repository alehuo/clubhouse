export enum UserPermissions {
  ALLOW_REMOVE_USER = Math.pow(2, 0),
  ALLOW_VIEW_USERS = Math.pow(2, 1),
}

export enum KeyPermissions {
  ALLOW_ADD_REMOVE_KEYS = Math.pow(2, 2),
  ALLOW_VIEW_KEYS = Math.pow(2, 3),
}

export enum StudentUnionPermissions {
  ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS = Math.pow(2, 4),
  ALLOW_VIEW_STUDENT_UNIONS = Math.pow(2, 5),
}

export enum CalendarPermissions {
  ALLOW_ADD_EDIT_REMOVE_EVENTS = Math.pow(2, 6),
  ALLOW_VIEW_EVENTS = Math.pow(2, 7),
}

export enum RulePermissions {
  ALLOW_ADD_EDIT_REMOVE_RULES = Math.pow(2, 8),
  ALLOW_VIEW_RULES = Math.pow(2, 9),
}

export enum NewspostPermissions {
  ALLOW_ADD_EDIT_REMOVE_POSTS = Math.pow(2, 10),
  ALLOW_VIEW_POSTS = Math.pow(2, 11),
}

export enum LocationPermissions {
  ALLOW_ADD_EDIT_REMOVE_LOCATIONS = Math.pow(2, 12),
  ALLOW_VIEW_LOCATIONS = Math.pow(2, 13),
}

export enum MessagePermissions {
  ALLOW_ADD_EDIT_REMOVE_MESSAGES = Math.pow(2, 14),
  ALLOW_VIEW_LOCATIONS = Math.pow(2, 15),
}

export enum MiscPermissions {
  ALLOW_ADD_EDIT_REMOVE_PERMISSIONS = Math.pow(2, 16),
  ALLOW_VIEW_PERMISSIONS = Math.pow(2, 17),
}
