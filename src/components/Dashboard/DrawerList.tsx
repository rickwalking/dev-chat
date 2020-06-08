import React from 'react';

import { useSelector } from 'react-redux';

import { RootState, Profile } from '../../firebase/interfaces';
import {
    useFirebaseConnect,
    isLoaded,
    FirebaseReducer,
} from 'react-redux-firebase';

import {
    List,
    Divider,
    ListSubheader,
} from '@material-ui/core';

import ChannelItem from './ChannelItem';
import DirectMessagesList from './DirectMessageLists';

import SkeletonList from './SkeletonList';

enum menuListType {
    CHANNEL,
    PRIVATE_CONVERSATION,
}

interface Channel {
    createdBy: firebase.User;
    photoUrl: string;
    id: string;
    name: string;
    details: string;
}

const DrawerList = (): JSX.Element => {
    useFirebaseConnect([
        { path: 'users' },
    ]);

    const users = useSelector((state: RootState): any =>
        state.firebase.ordered.users,
    );

    const profile: FirebaseReducer.Profile<Profile> =
        useSelector((state: RootState): FirebaseReducer.Profile<Profile> =>
            state.firebase.profile,
        );

    const getListSubhead = (list: number): JSX.Element => {
        return (
            <ListSubheader component='div' id='nested-list-subheader'>
                {list === menuListType.CHANNEL ? 'Channels' : 'Direct Messages'}
            </ListSubheader>
        );
    };

    const getUserInfo = (): any => {
        if (users === undefined) {
            return [];
        }

        for (const user of users) {
            if (user.value.email === profile['email']) {
                user.value.displayName = 'You';
            }
        }

        return users;
    };

    const getDirectMessagesList = (): JSX.Element => {
        if (!isLoaded(users)) {
            return <SkeletonList count={5} />;
        }

        return <DirectMessagesList users={getUserInfo()} />;
    };

    return (
        <>
            <List
                component='nav'
                aria-labelledby='nested-list-subheader'
                subheader={getListSubhead(menuListType.CHANNEL)}
            >
                <ChannelItem />
            </List>
            <Divider />
            <List
                component='nav'
                aria-labelledby='nested-list-subheader'
                subheader={getListSubhead(menuListType.PRIVATE_CONVERSATION)}
            >
                {getDirectMessagesList()}
            </List>
        </>
    );
};

export default DrawerList;
