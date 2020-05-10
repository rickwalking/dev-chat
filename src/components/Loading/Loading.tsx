import React from 'react';
import { CircularProgress, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface LoadingProps {
    isLoading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    }
}))

const Loading = (props: LoadingProps): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            {props.isLoading ? (
                <div className={classes.container}>
                    <CircularProgress />
                </div>
            ): null}
        </>
    );
};

export default Loading;