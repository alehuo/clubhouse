import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface AuthenticatedRouteProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
}
// TODO: Proper generic typings
const AuthenticatedRoute: React.SFC<AuthenticatedRouteProps & RouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export { AuthenticatedRoute };
