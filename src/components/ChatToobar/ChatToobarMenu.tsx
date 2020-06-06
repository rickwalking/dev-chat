import React, { useState, MouseEvent } from 'react';

import {
    Menu,
    IconButton,
    Avatar,
    makeStyles,
    Theme,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import {
    FirebaseReducer,
    useFirebase,
} from 'react-redux-firebase';

import {
    menuItemName,
    MyMenuItems,
    MenuItemsList,
} from './MenuItems-utils';
import ShowMenuItems from './ShowMenuItems';

// tslint:disable-next-line: typedef
const useStyles = makeStyles((theme: Theme) => ({
    avatarSmall: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

interface ChatToobarMenuProps {
    auth: FirebaseReducer.AuthState;
}

const ChatToobarMenu = (props: ChatToobarMenuProps): JSX.Element => {
    const classes = useStyles();
    const firebase = useFirebase();
    const history = useHistory();

    const [anchorElement, setAnchorElement] =
        useState<null | HTMLElement>(null);
    const open: boolean = Boolean(anchorElement);

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>): void => {
        setAnchorElement(event.currentTarget);
    };

    const handleCloseMenu = (): void => {
        setAnchorElement(null);
    };

    const handleLogout = (): void => {
        firebase.logout().then((): void => {
            history.push('/');
        });
    };

    const handleEditProfile = (): void => {
        //
    };

    const myMenuItems: MyMenuItems = {
        [menuItemName.EDIT_PROFILE]: {
            text: 'Edit Profile',
            callbackAction: handleEditProfile,
        },
        [menuItemName.LOGOFF]: {
            text: 'Logoff',
            callbackAction: handleLogout,
        },
    };

    const getItems = (): MenuItemsList[] => {
        return [
            myMenuItems[menuItemName.EDIT_PROFILE],
            myMenuItems[menuItemName.LOGOFF],
        ];
    };

    const getAvatar = (): string | undefined => {
        if (props.auth.photoURL === null) {
            return undefined;
        }

        return props.auth.photoURL;
    };

    return (
        <>
            <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenMenu}
                color='inherit'
            >
                <Avatar
                    src={getAvatar()}
                    className={classes.avatarSmall}
                />
            </IconButton>
            <Menu
                id='menu-appbar'
                anchorEl={anchorElement}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted={true}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleCloseMenu}
            >
                <ShowMenuItems
                    items={getItems()}
                />
            </Menu>
        </>
    );
};

export default ChatToobarMenu;
