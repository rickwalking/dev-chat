import { FirebaseReducer } from 'react-redux-firebase';

interface Profile {
    name: string;
    avatar: string;
}

export interface RootState {
    firebase: FirebaseReducer.Reducer<Profile>;
}
