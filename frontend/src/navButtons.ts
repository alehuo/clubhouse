interface NavButton {
  url: string;
  icon: string;
  text: string;
}

const navButtons: NavButton[] = [
  {
    url: "/news",
    icon: "comments",
    text: "News",
  },
  {
    url: "/calendar",
    icon: "calendar",
    text: "Calendar",
  },
  {
    url: "/keys",
    icon: "key",
    text: "Keys",
  },
  {
    url: "/studentunions",
    icon: "users",
    text: "Student unions",
  },
  {
    url: "/rules",
    icon: "list-ol",
    text: "Rules",
  },
  {
    url: "/users",
    icon: "users",
    text: "Users",
  },
];

export { navButtons };
