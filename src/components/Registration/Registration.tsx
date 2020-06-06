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

import md5 from 'md5';

import { useFirebase } from 'react-redux-firebase';

import Loading from '../Loading/Loading';
import AlertSnackbar from '../AlertSnackbar/AlertSnackbar';

// tslint:disable-next-line: typedef
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
                marginRight: theme.spacing(2),
            },
        },
    },
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
            photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
        }).then((): void => {
            setIsLoading(false);
        }).catch((errorResponse: any): void => {
            setIsLoading(false);
            setSnackbarOpen(true);
            setError(errorResponse.message);
        });
    };

    const facebookRegistration = (): void => {
        firebase.login({
            provider: 'facebook',
            type: 'redirect',
        }).then((): void => {
            //
        }).catch((errorResponse: any): void => {
            setSnackbarOpen(true);
            setError(errorResponse.message);
        });
    };

    const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const canRegister = (): boolean => {
        return name.length > 0 &&
            email.length > 0 &&
            password.length > 0;
    };

    const handleAlertClosing = (): void => {
        setSnackbarOpen(false);
    };

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
                            fullWidth={true}
                            required={true}
                            value={name}
                            onChange={handleName}
                        />
                        <TextField
                            label='Email'
                            variant='outlined'
                            fullWidth={true}
                            required={true}
                            value={email}
                            onChange={handleEmail}
                        />
                        <TextField
                            label='Password'
                            variant='outlined'
                            margin='normal'
                            fullWidth={true}
                            required={true}
                            value={password}
                            type='password'
                            autoComplete='password'
                            onChange={handlePassword}
                        />
                        <div className='buttonsContainer'>
                            <Button
                                className='buttonFirst'
                                variant='contained'
                                fullWidth={true}
                                disabled={!canRegister()}
                                color='primary'
                                type='submit'
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant='contained'
                                fullWidth={true}
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
};

export default Registration;
