import React from 'react';

import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';

import { User } from '../../firebase/interfaces';

interface DirectMessagesListProps {
    users: User[];
}

const DirectMessagesList = (props: DirectMessagesListProps): JSX.Element => {
    return (
        <>
        {props.users.map((user: User, index: number): JSX.Element => {
            return (
                <ListItem key={index} button={true}>
                    <ListItemAvatar>
                        <Avatar src={user.value.photoURL} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.value.displayName}
                        secondary='asdfasdfasdf'
                    />
                </ListItem>
            );
        })}
        </>
    );
};

export default DirectMessagesList;
