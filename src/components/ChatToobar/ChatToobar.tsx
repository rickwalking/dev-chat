import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    Theme,
    IconButton,
} from '@material-ui/core';

import { useSelector } from 'react-redux';
import { FirebaseReducer } from 'react-redux-firebase';

import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';

import { RootState, Profile } from '../../firebase/interfaces';
import ChatToobarMenu from './ChatToobarMenu';

interface ChatToobarProps {
    toggleDrawer: () => void;
}

const drawerWidth: number = 240;

// tslint:disable-next-line: typedef
const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    profileIcon: {
        marginLeft: 'auto',
    },
}));

const ChatToobar = (props: ChatToobarProps): JSX.Element => {
    const classes = useStyles(props);

    const profile: FirebaseReducer.Profile<Profile> =
        useSelector((state: RootState): FirebaseReducer.Profile<Profile> =>
            state.firebase.profile,
        );

    const toggleDrawer = (): void => props.toggleDrawer();

    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        className={classes.menuButton}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' noWrap={true}>
                        DevChat
                    </Typography>
                    <div className={classes.profileIcon}>
                        <ChatToobarMenu profile={profile} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ChatToobar;
