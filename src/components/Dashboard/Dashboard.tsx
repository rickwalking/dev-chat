import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { FirebaseReducer } from 'react-redux-firebase';

import { RootState } from '../../firebase/interfaces';

import {
    CssBaseline,
    Drawer,
    Divider,
    makeStyles,
    Theme,
} from '@material-ui/core';

import ChatToobar from '../ChatToobar/ChatToobar';
import DrawerList from './DrawerList';
import UserInfo from './UserInfo';

const drawerWidth: number = 240;

// tslint:disable-next-line: typedef
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const Dashboard = (): JSX.Element =>  {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const classes = useStyles();

    const toggleDrawer = (): void => {
        setDrawerOpen(!drawerOpen);
    };

    const auth: FirebaseReducer.AuthState =
        useSelector((state: RootState): FirebaseReducer.AuthState =>
            state.firebase.auth,
        );

  return (
    <div className={classes.root}>
        <CssBaseline />
        <ChatToobar toggleDrawer={toggleDrawer} />
        <Drawer
            className={classes.drawer}
            variant='persistent'
            classes={{
                paper: classes.drawerPaper,
            }}
            open={drawerOpen}
            anchor='left'
        >
            <UserInfo auth={auth} />
            <Divider />
                <DrawerList />
            </Drawer>
        <main className={classes.content}>
          <p>test</p>
        </main>
    </div>
  );
};

export default Dashboard;
