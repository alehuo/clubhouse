import { CalendarEvent, Permission } from "@alehuo/clubhouse-shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// @ts-ignore
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomOverlay from "../components/CustomOverlay";
import { RootState } from "../reduxStore";
import { fetchEvents } from "./../reducers/actions/calendarActions";
import { eventMapper } from "./../services/CalendarService";
import PermissionUtils from "./../utils/PermissionUtils";

const StyledCalendar = styled(Calendar)`
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
                    <FontAwesomeIcon icon="plus" /> Add an event
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
                    rel="noopener noreferrer"
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

        <StyledCalendar
          events={this.props.events.map(eventMapper)}
          step={60}
          views={Object.keys(Calendar.Views).map(
            // @ts-ignore
            (k) => Calendar.Views[k],
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
