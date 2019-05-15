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
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class AppCrashHandler extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.errorInfo !== undefined && this.state.error !== undefined) {
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
          <p>{this.state.error !== undefined && this.state.error}</p>
          <p>{this.state.errorInfo !== undefined && this.state.errorInfo}</p>
        </AppCrashScreenWrapper>
      );
    }
    return this.props.children;
  }
}

export { AppCrashHandler, AppCrashScreenWrapper };
