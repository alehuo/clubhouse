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
      <React.Fragment>
        <PageHeader>
          Calendar
          <p>
            {PermissionUtils.hasPermission(this.props.perms, 0x00004000) && (
              <Button bsStyle="success">
                <FontAwesome name="plus" /> Add an event
              </Button>
            )}
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(this.props.perms, 0x00020000) ? (
          <BigCalendar
            events={this.props.events.map(eventMapper)}
            step={60}
            views={allViews}
            timeslots={1}
            showMultiDayTimes
            defaultDate={new Date()}
            style={{ height: 800 }}
          />
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to calendar events</h4>
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
  perms: state.permission.userPerms
});

const mapDispatchToProps = {
  fetchEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
