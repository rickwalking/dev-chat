import React from 'react';

import { useSelector } from 'react-redux';

import {
    FirebaseReducer,
    isLoaded,
} from 'react-redux-firebase';

import { RootState } from '../firebase/interfaces';

import Loading from '../components/Loading/Loading';

import App from '../App';

const AuthLoaded = (): JSX.Element => {
    const auth: FirebaseReducer.AuthState =
        useSelector((state: RootState): FirebaseReducer.AuthState =>
            state.firebase.auth,
        );

    const showLoadingOrApp = (): JSX.Element => {
        if (!isLoaded(auth)) {
            return <Loading isLoading={true} />;
        }

        return <App />;
    };

    return (
        showLoadingOrApp()
    );
};

export default AuthLoaded;
