import React from 'react';

import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';

interface DirectMessagesListProps {
    auth: any;
}

const DirectMessagesList = (props: DirectMessagesListProps): JSX.Element => {
    return (
        <>
            <ListItem button={true}>
                <ListItemAvatar>
                    <Avatar src={props.auth.photoURL} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.auth.displayName}
                    secondary='asdfasdfasdf'
                />
            </ListItem>
        </>
    );
};

export default DirectMessagesList;
