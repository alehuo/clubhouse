import React, { Component } from "react";
import { connect } from "react-redux";
import BigCalendar from "react-big-calendar";
import { PageHeader, Button, Alert } from "react-bootstrap";
import moment from "moment";
import "./../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { fetchEvents } from "./../reducers/calendarReducer";
import { eventMapper } from "./../services/CalendarService";
import FontAwesome from "react-fontawesome";
import PermissionUtils from "./../utils/PermissionUtils";
import { Permissions } from "@alehuo/clubhouse-shared";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class CalendarPage extends Component {
  componentDidMount() {
    this.props.fetchEvents(this.props.token);
  }
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Calendar
          <p>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_ADD_EDIT_REMOVE_EVENTS.value
            ) && (
              <Button bsStyle="success">
                <FontAwesome name="plus" /> Add an event
              </Button>
            )}
          </p>
        </PageHeader>
        {process.env.REACT_APP_BACKEND_URL && (
          <p>
            iCal feed:{" "}
            <a
              href={process.env.REACT_APP_BACKEND_URL + "/api/v1/calendar/ical"}
              target="_blank"
            >
              {process.env.REACT_APP_BACKEND_URL + "/api/v1/calendar/ical"}
            </a>
            <br />
            <small>
              Please copy and paste this URL to your calendar application.
            </small>
          </p>
        )}
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permissions.ALLOW_VIEW_EVENTS.value
        ) ? (
          <BigCalendar
            events={this.props.events.map(eventMapper)}
            step={60}
            views={Object.keys(BigCalendar.Views).map(
              k => BigCalendar.Views[k]
            )}
            timeslots={1}
            showMultiDayTimes
            defaultDate={new Date()}
            style={{ height: 800 }}
          />
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view calendar events.</h4>
            <p>You don't have correct permissions to view calendar events.</p>
          </Alert>
        )}
        <div style={{ height: 50 }} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  events: state.calendar.events,
  perms: state.permission.userPerms,
  token: state.user.token
});

const mapDispatchToProps = {
  fetchEvents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarPage);
