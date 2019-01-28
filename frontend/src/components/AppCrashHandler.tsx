import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";

const bugReportUrl = "https://github.com/alehuo/clubhouse-frontend/issues/new";

const AppCrashScreenWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  color: #ff8484;
  text-align: center;
  padding-top: 50px;
`;

interface State {
  error: any;
  errorInfo: any;
}

class AppCrashHandler extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (!this.state.errorInfo) {
      return (
        <AppCrashScreenWrapper>
          <FontAwesome name={"frown"} size={"4x"} />
          <h3>The application has crashed.</h3>
          <p>
            Please report the bug at{" "}
            <a href={bugReportUrl} target="__blank">
              {bugReportUrl}
            </a>
          </p>
        </AppCrashScreenWrapper>
      );
    }
    return this.props.children;
  }
}

export { AppCrashHandler };
