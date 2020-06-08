import { FirebaseReducer, UserProfile } from 'react-redux-firebase';

export interface Profile extends UserProfile {
    displayName: string;
    photoURL: string;
    email: string;
    avatarUrl?: string;
    isOnline?: boolean;
}

export interface User {
    key: string;
    value: Profile;
}

interface Schema {
    users: User;
}

export interface RootState {
    firebase: FirebaseReducer.Reducer<Profile, Schema>;
}
