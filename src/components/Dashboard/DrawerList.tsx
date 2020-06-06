import React from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../firebase/interfaces';
import { FirebaseReducer } from 'react-redux-firebase';

import {
    List,
    Divider,
    ListSubheader,
} from '@material-ui/core';

import ChannelItem from './ChannelItem';
import DirectMessagesList from './DirectMessageLists';

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
    const auth: FirebaseReducer.AuthState =
    useSelector((state: RootState): FirebaseReducer.AuthState =>
        state.firebase.auth,
    );

    const getListSubhead = (list: number): JSX.Element => {
        return (
            <ListSubheader component='div' id='nested-list-subheader'>
                {list === menuListType.CHANNEL ? 'Channels' : 'Direct Messages'}
            </ListSubheader>
        );
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
                <DirectMessagesList auth={auth} />
            </List>
        </>
    );
};

export default DrawerList;
