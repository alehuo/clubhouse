import React, { Component } from "react";
import { PageHeader, Button, Panel, Label } from "react-bootstrap";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";
import {
  toggleWatchPage,
  toggleEndWatchModal,
  toggleStartWatchModal,
  fetchOwnWatchStatus
} from "../reducers/sessionReducer";
import EndSession from "./subpages/EndSession";
import StartSession from "./subpages/StartSession";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";
momentDurationFormat(moment);

export class Session extends Component {
  componentDidMount() {
    this.props.toggleWatchPage(true);
    this.props.fetchOwnWatchStatus(this.props.token);
  }
  componentWillUnmount() {
    this.props.toggleWatchPage(false);
  }
  render() {
    return (
      <React.Fragment>
        {this.props.endWatchModalOpen && (
          <EndSession
            show={this.props.endWatchModalOpen}
            onHide={() => this.props.toggleEndWatchModal(false)}
          />
        )}
        {this.props.startWatchModalOpen && (
          <StartSession
            show={this.props.startWatchModalOpen}
            onHide={() => this.props.toggleStartWatchModal(false)}
          />
        )}
        <PageHeader>
          Session status{" "}
          <p>
            <small>
              {this.props.watchRunning ? (
                <span>
                  Session started{" "}
                  {moment
                    .duration(moment().diff(moment(this.props.startTime)))
                    .format()}{" "}
                  ago
                </span>
              ) : (
                <span>You are not currently in a session.</span>
              )}
            </small>
          </p>
          <p>
            {this.props.watchRunning && (
              <Button
                bsStyle="warning"
                onClick={() => this.props.toggleEndWatchModal(true)}
              >
                <FontAwesome name="hourglass" /> End session
              </Button>
            )}
            {!this.props.watchRunning && (
              <Button
                bsStyle="success"
                onClick={() => this.props.toggleStartWatchModal(true)}
              >
                <FontAwesome name="play" /> Start session
              </Button>
            )}
            {"  "}
            <Button bsStyle="info">
              <FontAwesome name="envelope" /> Send message
            </Button>
          </p>
        </PageHeader>
        <p>
          There {this.props.peopleCount > 1 ? "are" : "is"} currently{" "}
          <strong>
            {this.props.peopleCount === 0
              ? "no one"
              : this.props.peopleCount > 1
                ? this.props.peopleCount + " persons"
                : this.props.peopleCount + " person"}
          </strong>{" "}
          in an ongoing session.
        </p>
        <p>
          Messages have different color codes.{" "}
          <Label bsStyle="info">Blue</Label> is session start, whereas{" "}
          <Label bsStyle="warning">yellow</Label> is a session end.{" "}
          <Label bsStyle="danger">Red</Label> is an incident, and white is a
          general message.
        </p>
        <h3>Session timeline</h3>
        <div
          style={{
            overflowY: "scroll",
            height: 350
          }}
        >
          <Panel bsStyle="warning">
            <Panel.Heading>
              <h4>
                <b>John Doe</b> on 8.8.2017 at 22:33
              </h4>
            </Panel.Heading>
            <Panel.Body>
              <p>
                I have left the building. Moved people under my supervision to
                another keyholder.
              </p>
            </Panel.Body>
          </Panel>
          <Panel bsStyle="danger">
            <Panel.Heading>
              <h4>
                <b>John Doe</b> on 8.8.2017 at 21:02
              </h4>
            </Panel.Heading>
            <Panel.Body>
              <p>A glass bowl shattered as one of the students dropped it.</p>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Heading>
              <h4>
                <b>John Doe</b> on 8.8.2017 at 17:33
              </h4>
            </Panel.Heading>
            <Panel.Body>
              <p>
                Status update. Everything is going as expected, no incidents to
                report!
              </p>
            </Panel.Body>
          </Panel>
          <Panel bsStyle="info">
            <Panel.Heading>
              <h4>
                <b>John Doe</b> on 8.8.2017 at 10:33
              </h4>
            </Panel.Heading>
            <Panel.Body>
              <p>
                Good evening, I'm taking responsibility of a few exchange
                students.
              </p>
            </Panel.Body>
          </Panel>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  perms: state.permission.userPerms,
  token: state.user.token,
  endWatchModalOpen: state.watch.endWatchModalOpen,
  startWatchModalOpen: state.watch.startWatchModalOpen,
  watchRunning: state.watch.ownWatchRunning,
  peopleCount: state.watch.ownWatchPeopleCount,
  startTime: state.watch.ownWatchStartTime
});

const mapDispatchToProps = {
  toggleWatchPage,
  toggleEndWatchModal,
  toggleStartWatchModal,
  fetchOwnWatchStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
