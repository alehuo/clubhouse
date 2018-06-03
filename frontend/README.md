# clubhouse-frontend <!-- DOCTOC SKIP -->

[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Front-end for Full-stack software development project course.

The front-end has been coded with JavaScript and React. React Redux is used to handle the application's state. Redux Thunk is used for asynchronous redux actions. React Bootstrap is used to construct the UI, with the help of React Router and React FontAwesome.

* [Production application at Heroku](https://clubhouse-frontend.herokuapp.com)
* [Back-end repository](https://github.com/alehuo/clubhouse-backend)

## Table of contents <!-- DOCTOC SKIP -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Installation instructions](#installation-instructions)
- [Running tests](#running-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Many student unions across Finland use so called "clubhouses" where they can organize events and have fun with other students.

It is not always clear what events are kept there, who has the permission to use such places and how to keep a good track of who is in response of other people, and when has such a person been there.

This project is meant to solve this problem by providing:

* List of student unions
* List of students that have access to clubhouses (night / day keys etc..)
* An Event calendar to look for events (Available also as iCal / RSS)
* Rules of the clubhouse easily available
* Cleaning schedules of the clubhouse
* A "newsboard" system for posting announcements
* Management interface for easy responsibility taking of other people
* Comprehensive admin interface for administrators to be constantly up to date of whats happening.
* Very flexible permissions system. You can add roles and customize their permissions as you wish.

## Installation instructions

1.  Clone the repo
2.  Install yarn if not yet installed
3.  Run `yarn` to install dependencies
4.  `yarn start` to start the front-end, or `yarn build` to create a production optimized build.

## Running tests

To run tests, run `yarn test`.