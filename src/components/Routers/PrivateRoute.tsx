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

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteProps>;
}

const PrivateRoute = ({
    component: Component,
    ...rest
}: PrivateRouteProps): JSX.Element => {
    const auth: FirebaseReducer.AuthState =
        useSelector((state: RootState): FirebaseReducer.AuthState =>
            state.firebase.auth,
        );

    const canNavigateToPrivateRoute = (): boolean => {
        return isLoaded(auth) && !isEmpty(auth);
    };

    return (
        <Route
            { ...rest }
            render={(props: RouteProps): JSX.Element => {
                return canNavigateToPrivateRoute() ? (
                    <Component {...props } />
                ) : (
                    <Redirect to='/' />
                );
            }}
        />
    );
};

export default PrivateRoute;
