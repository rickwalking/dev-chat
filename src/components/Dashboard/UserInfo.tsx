import React from 'react';

import { Avatar, Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

interface IUserInfoProps {
    auth: any;
}

// tslint:disable-next-line: typedef
const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        padding: theme.spacing(2),
    },
    avatarDescription: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

const UserInfo = (props: IUserInfoProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.toolbar}>
            <Avatar src={props.auth.photoURL} />
            <div className={classes.avatarDescription}>
                <Typography variant='subtitle2'>
                    {props.auth.displayName}
                </Typography>
                <Typography variant='body2'>
                    {props.auth.email}
                </Typography>
            </div>
    </div>
    );
};

export default UserInfo;
