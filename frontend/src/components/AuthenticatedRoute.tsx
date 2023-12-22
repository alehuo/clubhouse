import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps } from 'react-router-dom';
import { RootState } from '../reduxStore';

interface AuthenticatedRouteProps {
    component: React.ComponentType;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps & RouteProps> = ({ component: Component, ...rest }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return (
        <Route
            {...rest}
            render={props => {
                return token !== null ? <Component {...props} /> : <div>Please login</div>;
            }}
        />
    );
};

export { AuthenticatedRoute };
