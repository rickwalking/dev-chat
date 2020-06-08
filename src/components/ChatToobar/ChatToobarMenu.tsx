import React, { useState, MouseEvent } from 'react';

import {
    Menu,
    IconButton,
    Avatar,
    makeStyles,
    Theme,
    Dialog,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import {
    useFirebase,
} from 'react-redux-firebase';

import {
    menuItemName,
    MyMenuItems,
    MenuItemsList,
} from './MenuItems-utils';
import ShowMenuItems from './ShowMenuItems';
import { Profile } from '../../firebase/interfaces';
import AddChannel from '../Modal/AddChannel';

// tslint:disable-next-line: typedef
const useStyles = makeStyles((theme: Theme) => ({
    avatarSmall: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

interface ChatToobarMenuProps {
    profile: Profile;
}

const ChatToobarMenu = (props: ChatToobarMenuProps): JSX.Element => {
    const classes = useStyles();
    const firebase = useFirebase();
    const history = useHistory();

    const [anchorElement, setAnchorElement] =
        useState<null | HTMLElement>(null);
    const open: boolean = Boolean(anchorElement);

    const [modalOpen, setModalOpen] = useState(false);

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

    const addChannel = (): void => {
        setModalOpen(true);
        handleCloseMenu();
    };

    const handleCloseModal = (): void => {
        setModalOpen(false);
    };

    const myMenuItems: MyMenuItems = {
        [menuItemName.EDIT_PROFILE]: {
            text: 'Edit Profile',
            callbackAction: handleEditProfile,
        },
        [menuItemName.ADD_CHANNEL]: {
            text: 'Add Channel',
            callbackAction: addChannel,
        },
        [menuItemName.LOGOFF]: {
            text: 'Logoff',
            callbackAction: handleLogout,
        },
    };

    const getItems = (): MenuItemsList[] => {
        return [
            myMenuItems[menuItemName.EDIT_PROFILE],
            myMenuItems[menuItemName.ADD_CHANNEL],
            myMenuItems[menuItemName.LOGOFF],
        ];
    };

    const getAvatar = (): string | undefined => {
        if (props.profile.photoURL === null) {
            return undefined;
        }

        return props.profile.photoURL;
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
            <Dialog open={modalOpen} onClose={handleCloseModal} aria-labelledby='form-dialog-title'>
                <AddChannel closeModalCallback={handleCloseModal} />
            </Dialog>
        </>
    );
};

export default ChatToobarMenu;
