import moment from "moment";
import "moment/locale/fi";
import React, { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Dispatch } from "redux";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { Container } from "./components/Container";
import CustomOverlay from "./components/CustomOverlay";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navigation } from "./components/Navigation";
import NotificationDrawer from "./components/NotificationDrawer";
import { navButtons } from "./navButtons";
import CalendarPage from "./pages/CalendarPage";
import KeysPage from "./pages/KeysPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import RegisterPage from "./pages/RegisterPage";
import RulesPage from "./pages/RulesPage";
import Session from "./pages/Session";
import StudentUnionsPage from "./pages/StudentUnionsPage";
import UserListPage from "./pages/UserListPage";
import UserProfilePage from "./pages/UserProfilePage";
import { initApp } from "./reducers/actions/rootActions";
import { RootAction } from "./reducers/rootReducer";
import { RootState } from "./reduxStore";
moment.locale("fi");

const App: React.FC = () => {
  const dispatch = useDispatch<Dispatch<RootAction>>();

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);

  const token = useSelector((state: RootState) => state.user.token);
  const isAuthenticated = token !== "";

  const appLoading = useSelector((state: RootState) => state.root.appLoading);
  const userData = useSelector((state: RootState) => state.user.userData);
  const sessionPage = useSelector(
    (state: RootState) => state.session.sessionPage,
  );
  const sessionRunning = useSelector(
    (state: RootState) => state.session.ownSessionRunning,
  );
  const peopleCount = useSelector(
    (state: RootState) => state.session.ownSessionPeopleCount,
  );

  if (appLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Navigation
        isAuthenticated={isAuthenticated}
        navButtons={navButtons}
        userData={userData}
      />
      <Container className="container" style={{ paddingTop: 30 }}>
        <NotificationDrawer />
        {!(sessionPage || !isAuthenticated) && sessionRunning && (
          <Alert variant="info">
            <h5>
              {peopleCount > 0 && (
                <React.Fragment>
                  You are currently in an ongoing session.
                </React.Fragment>
              )}
              <br />
              <br />
              <LinkContainer to="/session">
                <CustomOverlay
                  id="currentSessionInfo"
                  text="View current session info."
                >
                  <Button variant="primary">View current session</Button>
                </CustomOverlay>
              </LinkContainer>
            </h5>
          </Alert>
        )}
        <React.Fragment>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/studentunions" component={StudentUnionsPage} />
          <Route exact path="/keys" token={token} component={KeysPage} />
          <Route exact path="/calendar" component={CalendarPage} />
          <Route exact path="/rules" component={RulesPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <AuthenticatedRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/session"
            component={Session}
          />
          <AuthenticatedRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/logout"
            component={LogoutPage}
          />
          <AuthenticatedRoute
            isAuthenticated={isAuthenticated}
            path="/user"
            component={UserProfilePage}
          />
          <AuthenticatedRoute
            isAuthenticated={isAuthenticated}
            exact
            path="/users"
            component={UserListPage}
          />
        </React.Fragment>
      </Container>
    </Router>
  );
};

export default App;
