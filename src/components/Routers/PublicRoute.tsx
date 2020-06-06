import React from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../firebase/interfaces';

import {
    FirebaseReducer,
    isLoaded,
    isEmpty,
} from 'react-redux-firebase';

import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
    component: React.ComponentType<RouteProps>;
}

const PublicRoute = ({
    component: Component,
    ...rest
}: PublicRouteProps): JSX.Element => {
    const auth: FirebaseReducer.AuthState =
        useSelector((state: RootState): FirebaseReducer.AuthState =>
            state.firebase.auth,
        );

    const canNavigateToPublicRoute = (): boolean => {
        return isLoaded(auth) && isEmpty(auth);
    };

    return (
        <Route
            { ...rest }
            render={(routeProps: RouteProps): JSX.Element => {
                return canNavigateToPublicRoute() ? (
                    <Component {...routeProps } />
                ) : (
                    <Redirect to='/dashboard' />
                );
            }}
        />
    );
};

export default PublicRoute;
