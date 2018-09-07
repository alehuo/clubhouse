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
import EndWatch from "./subpages/EndWatch";
import StartWatch from "./subpages/StartWatch";

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
          <EndWatch
            show={this.props.endWatchModalOpen}
            onHide={() => this.props.toggleEndWatchModal(false)}
          />
        )}
        {this.props.startWatchModalOpen && (
          <StartWatch
            show={this.props.startWatchModalOpen}
            onHide={() => this.props.toggleStartWatchModal(false)}
          />
        )}
        <PageHeader>
          Session status{" "}
          <small>
            {this.props.watchRunning ? (
              <span>
                Elapsed time: <b>2 hours, 26 minutes, 20 seconds</b>
              </span>
            ) : (
              <span>You are not currently in a session.</span>
            )}
          </small>
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
            {"  "}
            <Button bsStyle="danger">
              <FontAwesome name="exclamation" /> Report incident
            </Button>
          </p>
        </PageHeader>
        <p>
          Messages have different color codes.{" "}
          <Label bsStyle="info">Blue</Label> is session start, whereas{" "}
          <Label bsStyle="warning">yellow</Label> is a session end.{" "}
          <Label bsStyle="danger">Red</Label> is an incident, and white is a
          general message.
        </p>
        <h3>
          Session timeline, since <b>8.8.2017</b> at <b>10:33</b>
        </h3>
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
  watchRunning: state.watch.ownWatchRunning
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
