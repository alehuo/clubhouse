import React, { Component } from "react";
import { connect } from "react-redux";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "./../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { fetchEvents } from "./../reducers/calendarReducer";
import { eventMapper } from "./../services/CalendarService";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class CalendarPage extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    let allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );
    return (
      <BigCalendar
        events={this.props.events.map(eventMapper)}
        step={60}
        views={allViews}
        timeslots={1}
        showMultiDayTimes
        defaultDate={new Date()}
        style={{ height: 700 }}
      />
    );
  }
}

const mapStateToProps = state => ({
  events: state.calendar.events
});

const mapDispatchToProps = {
  fetchEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
