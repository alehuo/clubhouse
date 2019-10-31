import { Paper, Typography } from "@material-ui/core";
import React from "react";

const MainPage: React.FC = () => (
  <Paper style={{ padding: 20, marginTop: 20, marginBottom: 20 }}>
    <Typography variant="h3">Welcome!</Typography>
    <Typography component="p" style={{ marginTop: 10, marginBottom: 10 }}>
      Manage your clubhouse with ease. Source code available{" "}
      <a href="https://github.com/alehuo/clubhouse.git" target="blank">
        here
      </a>
    </Typography>
    <Typography component="p" style={{ marginTop: 10, marginBottom: 10 }}>
      Many student unions across Finland use so called "clubhouses" where they
      can organize events and have fun with other students.
    </Typography>
    <Typography component="p" style={{ marginTop: 10, marginBottom: 10 }}>
      It is not always clear what events are kept there, who has the permission
      to use such places and how to keep a good track of who is in response of
      other people, and when has such a person been there.
    </Typography>
    <Typography component="p" style={{ marginTop: 10, marginBottom: 10 }}>
      This project is meant to solve this problem by providing:
      <ul>
        <li>Student union management</li>
        <li>
          Key management (To assign keys to people with different types of keys.
          For example, 24h and day keys)
        </li>
        <li>
          Event management to organize and look for events (Events are available
          as an iCal feed)
        </li>
        <li>Rule management</li>
        <li>Cleaning schedule management</li>
        <li>A "newsboard" system for posting announcements</li>
        <li>
          A management interface for easy responsibility taking of other people
        </li>
        <li>Sending messages to other people in the service</li>
        <li>
          A very flexible permissions system. You can add roles and customize
          their permissions as you wish.
        </li>
        <li>E-mail integration</li>
        <li>Push-notification support</li>
        <li>
          Available as a PWA (Progressive Web Application) that can be easily
          installed
        </li>
      </ul>
    </Typography>
    <Typography component="p" style={{ marginTop: 10, marginBottom: 10 }}>
      Feel free to fork the project and modify it to suit your needs. The
      project has been licensed with MIT license.
    </Typography>
  </Paper>
);

export default MainPage;
