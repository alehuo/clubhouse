import React, { Component } from "react";
import { connect } from "react-redux";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "./../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export class CalendarPage extends Component {
  render() {
    let allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );
    return (
      <BigCalendar
        events={events}
        step={60}
        views={allViews}
        timeslots={1}
        showMultiDayTimes
        defaultDate={new Date(2015, 3, 1)}
        style={{ height: 700 }}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
