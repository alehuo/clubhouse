import moment from "moment";
import React from "react";
import { Badge, Button, Card, Container, Jumbotron } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import CustomOverlay from "../components/CustomOverlay";
import {
  fetchOwnSessionStatus,
  toggleEndSessionModal,
  toggleSessionPage,
  toggleStartSessionModal,
} from "../reducers/actions/sessionActions";
import { RootState } from "../reduxStore";
import EndSession from "./subpages/EndSession";
import StartSession from "./subpages/StartSession";

interface Props {
  token: string;
  endSessionModalOpen: boolean;
  startSessionModalOpen: boolean;
  toggleSessionPage: any;
  fetchOwnSessionStatus: any;
  toggleEndSessionModal: any;
  toggleStartSessionModal: any;
  watchRunning: boolean;
  startTime?: string;
  peopleCount: number;
}

interface SessionMessage {
  id: number;
  name: string;
  date: string;
  text: string;
  type?: "warning" | "danger" | "info";
}

const sessionMessages: SessionMessage[] = [
  {
    id: 1,
    name: "John Doe",
    date: "08.08.2017 at 22:33",
    text:
      "I have left the building. Moved people under my supervision to another keyholder.",
    type: "warning",
  },
  {
    id: 2,
    name: "John Doe",
    date: "08.08.2017 at 22:33",
    text: "A glass bowl shattered as one of the students dropped it.",
    type: "danger",
  },
  {
    id: 3,
    name: "John Doe",
    date: "08.08.2017 at 17:33",
    text:
      "Status update. Everything is going as expected, no incidents to report!",
  },
  {
    id: 4,
    name: "John Doe",
    date: "08.08.2017 at 10:33",
    text: "Good evening, I'm taking responsibility of a few exchange students.",
    type: "info",
  },
];

export class Session extends React.Component<Props> {
  public componentDidMount() {
    this.props.toggleSessionPage(true);
    this.props.fetchOwnSessionStatus(this.props.token);
  }
  public componentWillUnmount() {
    this.props.toggleSessionPage(false);
  }
  public render() {
    return (
      <React.Fragment>
        {this.props.endSessionModalOpen && (
          <EndSession
            show={this.props.endSessionModalOpen}
            onHide={() => this.props.toggleEndSessionModal(false)}
          />
        )}
        {this.props.startSessionModalOpen && (
          <StartSession
            show={this.props.startSessionModalOpen}
            onHide={() => this.props.toggleStartSessionModal(false)}
          />
        )}
        <Jumbotron>
          <Container>
            <h1>Session status</h1>
            <p>
              {this.props.watchRunning && this.props.startTime ? (
                <span>
                  Session started
                  {" " +
                    moment(this.props.startTime).format("DD.MM.YYYY HH:mm:ss")}
                </span>
              ) : (
                <span>You are not currently in a session.</span>
              )}
            </p>
            <p>
              {this.props.watchRunning && (
                <CustomOverlay
                  id="endSessionTooltip"
                  text="This will end your current session."
                >
                  <Button
                    variant="warning"
                    onClick={() => this.props.toggleEndSessionModal(true)}
                  >
                    <FontAwesome name="hourglass" /> End session
                  </Button>
                </CustomOverlay>
              )}
              {!this.props.watchRunning && (
                <CustomOverlay
                  id="startSessionTooltip"
                  text="This will start a new session"
                >
                  <Button
                    variant="success"
                    onClick={() => this.props.toggleStartSessionModal(true)}
                  >
                    <FontAwesome name="play" /> Start session
                  </Button>
                </CustomOverlay>
              )}
              {"  "}
              <CustomOverlay
                id="sendMessageTooltip"
                text="Sends a message to all verified keyholders."
              >
                <Button variant="info">
                  <FontAwesome name="envelope" /> Send message
                </Button>
              </CustomOverlay>
            </p>
          </Container>
        </Jumbotron>
        <p>
          There {this.props.peopleCount > 1 ? "are" : "is"} currently{" "}
          <Badge variant="primary">
            {this.props.peopleCount === 0
              ? "no one"
              : this.props.peopleCount > 1
              ? this.props.peopleCount + " persons"
              : this.props.peopleCount + " person"}
          </Badge>{" "}
          in an ongoing session.
        </p>
        <p>
          Messages have different color codes.{" "}
          <Badge variant="info">Blue</Badge> is session start, whereas{" "}
          <Badge variant="warning">yellow</Badge> is a session end.{" "}
          <Badge variant="danger">Red</Badge> is an incident, and white is a
          general message.
        </p>
        <h3>Session timeline</h3>
        <div>
          {sessionMessages &&
            sessionMessages.map((msg) => (
              <Card
                text={msg.type ? "white" : "dark"}
                bg={msg.type ? msg.type : "light"}
                key={msg.id}
                style={{ marginTop: 5, marginBottom: 5 }}
              >
                <Card.Header>Session message</Card.Header>
                <Card.Body>
                  <Card.Title>{msg.name}</Card.Title>
                  <Card.Subtitle className="mb-2">{msg.date}</Card.Subtitle>
                  <Card.Text>{msg.text}</Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  perms: state.user.userPerms,
  token: state.user.token,
  endSessionModalOpen: state.session.endSessionModalOpen,
  startSessionModalOpen: state.session.startSessionModalOpen,
  watchRunning: state.session.ownSessionRunning,
  peopleCount: state.session.ownSessionPeopleCount,
  startTime: state.session.ownSessionStartTime,
});

const mapDispatchToProps = {
  toggleSessionPage,
  toggleEndSessionModal,
  toggleStartSessionModal,
  fetchOwnSessionStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Session);
