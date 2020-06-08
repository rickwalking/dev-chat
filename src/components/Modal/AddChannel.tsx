import React from 'react';

import {
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';

interface AddChannelProps {
    closeModalCallback: () => void;
}

const AddChannel = (props: AddChannelProps): JSX.Element => {
    return (
        <>
            <DialogTitle id='form-dialog-title'>Add Channel</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Adding new channel with users
                </DialogContentText>
                <TextField
                    autoFocus={true}
                    margin='dense'
                    id='name'
                    label='Channel Name'
                    type='text'
                    fullWidth={true}
                />
                <TextField
                    margin='dense'
                    id='description'
                    label='Channel description'
                    type='text'
                    fullWidth={true}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeModalCallback} color='primary'>
                    Cancel
                </Button>
                <Button onClick={props.closeModalCallback} color='primary'>
                    Add Channel
                </Button>
            </DialogActions>
        </>
    );
};

export default AddChannel;
