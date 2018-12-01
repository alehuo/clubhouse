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
  // FIXME: TSLint / TypeScript bug.
  // The object spread operator confuses the linter as a trailing comma is not allowed after the rest operator
  // @ts-ignore
  ...rest,
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
