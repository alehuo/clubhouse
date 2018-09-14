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
          <li>Student union management</li>
          <li>
            Key management (To assign keys to people with different types of
            keys. For example, 24h and day keys)
          </li>
          <li>
            Event management to organize and look for events (Events are
            available as an iCal feed)
          </li>
          <li>Rule management</li>
          <li>Cleaning schedule management</li>
          <li>A "newsboard" system for posting announcements</li>
          <li>
            A management interface for easy responsibility taking of other
            people
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
