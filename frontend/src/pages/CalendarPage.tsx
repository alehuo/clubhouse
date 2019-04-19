import { CalendarEvent, Permission } from "@alehuo/clubhouse-shared";
import moment from "moment";
import React from "react";
import BigCalendar from "react-big-calendar";
import { Button, Container, Jumbotron } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomOverlay from "../components/CustomOverlay";
import { RootState } from "../reduxStore";
import "./../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { fetchEvents } from "./../reducers/actions/calendarActions";
import { eventMapper } from "./../services/CalendarService";
import PermissionUtils from "./../utils/PermissionUtils";

const Calendar = styled<any>(BigCalendar)`
  height: 800px !important;
`;

interface Props {
  token: string;
  fetchEvents: any;
  perms: number;
  events: CalendarEvent[];
}

class CalendarPage extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchEvents();
  }
  public render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <Container>
            <h1>Calendar</h1>
            <p>
              {PermissionUtils.hasPermission(
                this.props.perms,
                Permission.ALLOW_ADD_EDIT_REMOVE_EVENTS,
              ) && (
                <CustomOverlay
                  id="addCalendarEvent"
                  text="Add a new calendar event."
                >
                  <Button variant="success">
                    <FontAwesome name="plus" /> Add an event
                  </Button>
                </CustomOverlay>
              )}
            </p>
            <p>
              {process.env.REACT_APP_BACKEND_URL && (
                <p>
                  iCal feed:{" "}
                  <a
                    href={
                      process.env.REACT_APP_BACKEND_URL +
                      "/api/v1/calendar/ical"
                    }
                    target="_blank"
                  >
                    {process.env.REACT_APP_BACKEND_URL +
                      "/api/v1/calendar/ical"}
                  </a>
                  <br />
                  <small>
                    Please copy and paste this URL to your calendar application.
                  </small>
                </p>
              )}
            </p>
          </Container>
        </Jumbotron>

        <Calendar
          localizer={BigCalendar.momentLocalizer(moment)}
          events={this.props.events.map(eventMapper)}
          step={60}
          views={Object.keys(BigCalendar.Views).map(
            // @ts-ignore
            (k) => BigCalendar.Views[k],
          )}
          timeslots={1}
          showMultiDayTimes
          defaultDate={new Date()}
        />
        <div style={{ height: 50 }} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  events: state.calendar.events,
  perms: state.user.userPerms,
  token: state.user.token,
});

const mapDispatchToProps = {
  fetchEvents,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarPage);
