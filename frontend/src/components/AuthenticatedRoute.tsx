import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface AuthenticatedRouteProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps & RouteProps> = ({
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
        <div>You must be logged in to view this page.</div>
      );
    }}
  />
);

export { AuthenticatedRoute };
