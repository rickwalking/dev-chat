import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Snackbar } from '@material-ui/core';
import { Color } from '@material-ui/lab/Alert';

import Alert from './Alert';

interface SnackProps {
    isOpen: boolean;
    message: string;
    type: Color;
    closeCallback: () => void,
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}))

const AlertSnackbar = (props: SnackProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar
                open={props.isOpen}
                autoHideDuration={5000}
                onClose={props.closeCallback}
            >
                <Alert severity={props.type}>{props.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default AlertSnackbar;
