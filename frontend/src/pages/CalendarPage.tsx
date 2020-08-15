import { CalendarEvent, Permission } from '@alehuo/clubhouse-shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import CustomOverlay from '../components/CustomOverlay';
import { RootState } from '../reduxStore';
import { fetchEvents } from './../reducers/actions/calendarActions';
import PermissionUtils from './../utils/PermissionUtils';
import { Button } from '@material-ui/core';

interface Props {
    token: string | null;
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
                <div>
                    <div>
                        <h1>Calendar</h1>
                        <p>
                            {PermissionUtils.hasPermission(
                                this.props.perms,
                                Permission.ALLOW_ADD_EDIT_REMOVE_EVENTS,
                            ) && (
                                <CustomOverlay id="addCalendarEvent" text="Add a new calendar event.">
                                    <Button variant="text">
                                        <FontAwesomeIcon icon="plus" /> Add an event
                                    </Button>
                                </CustomOverlay>
                            )}
                        </p>
                        <p>
                            {process.env.REACT_APP_BACKEND_URL && (
                                <p>
                                    iCal feed:{' '}
                                    <a
                                        href={process.env.REACT_APP_BACKEND_URL + '/api/v1/calendar/ical'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {process.env.REACT_APP_BACKEND_URL + '/api/v1/calendar/ical'}
                                    </a>
                                    <br />
                                    <small>Please copy and paste this URL to your calendar application.</small>
                                </p>
                            )}
                        </p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    events: state.calendar.events,
    perms: state.user.userPerms,
    token: state.auth.token,
});

const mapDispatchToProps = {
    fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
