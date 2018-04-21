import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron } from "react-bootstrap";

import Typed from "typed.js";

export class MainPage extends Component {
  componentDidMount() {
    var options = {
      strings: [
        "Manage your clubhouse with ease.\nSource code available <a href='https://github.com/alehuo/clubhouse-frontend.git'>here (frontend)</a> and <a href='https://github.com/alehuo/clubhouse-backend.git'>here (backend)</a>.\n\nEnjoy!"
      ],
      typeSpeed: 25
    };

    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <Jumbotron>
        <h1>Welcome!</h1>
        <p>
          <span
            style={{ whiteSpace: "pre" }}
            ref={el => {
              this.el = el;
            }}
          />
        </p>
        <hr />
        <p>
          Many student unions across Finland use so called "clubhouses" where
          they can organize events and have fun with other students.
        </p>
        <p>
          It is not always clear what events are kept there, who has the
          permission to use such places and how to keep a good track of who is
          in response of other people, and when has such a person been there.
        </p>
        <hr />
        This project is meant to solve this problem by providing:
        <ul>
          <li>A list of student unions</li>
          <li>
            A list of students that have access to clubhouses (night / day keys
            etc..)
          </li>
          <li>
            An event calendar to look for events (Available also as iCal / RSS)
          </li>
          <li>The rules of the clubhouse easily available</li>
          <li>The cleaning schedules of the clubhouse</li>
          <li>A "newsboard" system for posting announcements</li>
          <li>
            A management interface for easy responsibility taking of other
            people
          </li>
          <li>
            A comprehensive admin interface for administrators to be constantly
            up to date of whats happening.
          </li>
          <li>
            A very flexible permissions system. You can add roles and customize
            their permissions as you wish.
          </li>
        </ul>
        <hr />
        <p>
          Feel free to fork the project and modify it to suit your needs. The
          project has been licensed with MIT license.
        </p>
      </Jumbotron>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
