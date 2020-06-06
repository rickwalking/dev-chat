import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';

const ChannelItem = (): JSX.Element => {
    return (
        <>
            <ListItem button={true}>
                <ListItemAvatar>
                    <Avatar>
                        PH
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Channel test' secondary='test2' />
            </ListItem>
        </>
    );
}

export default ChannelItem;
