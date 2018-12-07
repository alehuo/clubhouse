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
      return localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <div>You must be logged in to view this page.</div>
      );
    }}
  />
);

export { AuthenticatedRoute };
