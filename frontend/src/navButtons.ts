export interface NavButton {
  url: string;
  icon: string;
  text: string;
  auth: boolean;
}

const navButtons: NavButton[] = [
  {
    url: "/news",
    icon: "comments",
    text: "News",
    auth: false,
  },
  {
    url: "/calendar",
    icon: "calendar",
    text: "Calendar",
    auth: false,
  },
  {
    url: "/keys",
    icon: "key",
    text: "Keys",
    auth: true,
  },
  {
    url: "/studentunions",
    icon: "users",
    text: "Student unions",
    auth: true,
  },
  {
    url: "/rules",
    icon: "list-ol",
    text: "Rules",
    auth: false,
  },
  {
    url: "/users",
    icon: "users",
    text: "Users",
    auth: true,
  },
];

export { navButtons };
