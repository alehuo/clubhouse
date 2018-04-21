import React, { Component } from "react";
import { PageHeader, Button, Panel, Label, Well } from "react-bootstrap";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";
import { toggleWatchPage } from "./../reducers/watchReducer";

export class Session extends Component {
  componentDidMount() {
    this.props.toggleWatchPage(true);
  }
  componentWillUnmount() {
    this.props.toggleWatchPage(false);
  }
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          Current session{" "}
          <small>
            Elapsed time: <b>2 hours, 26 minutes, 20 seconds</b>
          </small>
          <p>
            <Button bsStyle="warning">
              <FontAwesome name="hourglass" /> End session
            </Button>
            {"  "}
            <Button bsStyle="info">
              <FontAwesome name="envelope" /> Send session message
            </Button>
            {"  "}
            <Button bsStyle="danger">
              <FontAwesome name="exclamation" /> REPORT INCIDENT
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

const mapStateToProps = state => ({});

const mapDispatchToProps = { toggleWatchPage };

export default connect(mapStateToProps, mapDispatchToProps)(Session);
