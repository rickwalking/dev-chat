import React, {
    useState,
    ChangeEvent,
    FormEvent,
} from 'react';

import {
    CssBaseline,
    Theme,
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';

import Loading from '../Loading/Loading';
import { useFirebase } from 'react-redux-firebase';
import AlertSnackbar from '../AlertSnackbar/AlertSnackbar';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(8),
    },
    form: {
        marginTop: theme.spacing(8),
        '& .buttonsContainer': {
            display:'flex',
            marginTop: theme.spacing(2),
            '& .buttonFirst': {
                marginRight: theme.spacing(2)
            }
        }
    }
}));

const Registration = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const firebase = useFirebase();

    const classes = useStyles();

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if(!canRegister()) {
            return;
        }

        setError('');
        setIsLoading(true);

        firebase.createUser({
            email,
            password,
        }, {
            displayName: name,
        }).then((user): void => {
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            setSnackbarOpen(true);
            setError(error.message);
        })
    }

    const facebookRegistration = () => {
        firebase.login({
            provider: 'facebook',
            type: 'redirect',
        }).then((user) => {
            console.log(user);
        }).catch((error) => {
            setSnackbarOpen(true);
            setError(error.message);
        });
    }

    const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    }

    const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }

    const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const canRegister = (): boolean => {
        return name.length > 0 &&
            email.length > 0 &&
            password.length > 0;
    }

    const handleAlertClosing = () => {
        setSnackbarOpen(false);
    }

    return (
        <>
            <Loading isLoading={isLoading} />
            <CssBaseline />
            <Container component='div' maxWidth='xs'>
                <div className={classes.container}>
                    <Typography component='h1' variant='h4'>
                        Sign Up to DevChat
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextField
                            label='Name'
                            margin='normal'
                            variant='outlined'
                            fullWidth
                            required
                            value={name}
                            onChange={handleName}
                        />
                        <TextField
                            label='Email'
                            variant='outlined'
                            fullWidth
                            required
                            value={email}
                            onChange={handleEmail}
                        />
                        <TextField
                            label='Password'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            required
                            value={password}
                            type='password'
                            autoComplete='password'
                            onChange={handlePassword}
                        />
                        <div className='buttonsContainer'>
                            <Button
                                className='buttonFirst'
                                variant='contained'
                                fullWidth
                                disabled={!canRegister()}
                                color='primary'
                                type='submit'
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant='contained'
                                fullWidth
                                color='primary'
                                onClick={facebookRegistration}
                            >
                                Facebook Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
            <AlertSnackbar
                isOpen={isSnackbarOpen}
                message={error}
                type='error'
                closeCallback={handleAlertClosing}
            />
        </>
    );
}

export default Registration;