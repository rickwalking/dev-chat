import React, {
    ChangeEvent,
    useState,
    FormEvent,
} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import MessageOutlined from '@material-ui/icons/Email';

import { useFirebase } from 'react-redux-firebase';

import { auth } from 'firebase';

import { useHistory } from 'react-router-dom';

import {
    makeStyles,
    Theme,
    Avatar,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';

import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

import Loading from '../Loading/Loading';
import AlertSnackbar from '../AlertSnackbar/AlertSnackbar';

// tslint:disable-next-line: typedef
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    groupTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    avatar: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(10),
        '& .buttonsContainer': {
            display: 'flex',
            marginTop: theme.spacing(2),
            '& .buttonFirst': {
                marginRight: theme.spacing(2),
            },
        },
    },
    placeholder: {
        marginTop: theme.spacing(5),
    },
    buttonGoogle: {
        marginTop: theme.spacing(2),
    },
}));

const Login = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSnackOpen, setIsSnackOpen] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

    const firebase = useFirebase();

    const classes = useStyles();

    const handleUsername = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    };

    const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const canLogin = (): boolean => {
        return username !== '' &&
            password !== '';
    };

    const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!canLogin()) {
            return;
        }

        setError('');
        setIsLoading(true);

        firebase.login({
            email: username,
            password,
        }).then((user: auth.UserCredential): void => {
            setIsLoading(false);
            history.push('/dashboard');
        }).catch((responseError: auth.Error): void => {
            setIsLoading(false);
            setError(responseError.message);
            setIsSnackOpen(true);
        });
    };

    const googleLogin = (): void => {
        firebase.login({
            provider: 'google',
            type: 'redirect',
        });
    };

    const handleAlertClosing = (): void => {
        setIsSnackOpen(false);
    };

    const goToRegistration = (): void => {
        history.push('/registration');
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <CssBaseline />
            <Container component='div' maxWidth='xs'>
                <div className={classes.container}>
                    <div className={classes.groupTitle}>
                    <Avatar className={classes.avatar}>
                        <ChatBubbleTwoToneIcon />
                    </Avatar>
                    <Typography variant='h6'>Dev Chat</Typography>
                    </div>
                    <Typography component='h1' variant='h4'>
                        Sign In to DevChat
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            label='Username'
                            variant='outlined'
                            fullWidth={true}
                            required={true}
                            onChange={handleUsername}
                            />
                        <TextField
                            label='Password'
                            variant='outlined'
                            margin='normal'
                            fullWidth={true}
                            required={true}
                            type='password'
                            autoComplete='password'
                            onChange={handlePassword}
                        />
                        <div className='buttonsContainer'>
                            <Button
                                className='buttonFirst'
                                variant='contained'
                                fullWidth={true}
                                disabled={!canLogin()}
                                color='primary'
                                type='submit'
                            >
                                Sign In
                            </Button>
                            <Button
                                variant='outlined'
                                fullWidth={true}
                                color='secondary'
                                onClick={goToRegistration}
                            >
                                Sign Up
                            </Button>

                        </div>
                    </form>
                    <Typography
                        component='h1'
                        variant='h5'
                        className={classes.placeholder}
                    >
                        Or Sign In With
                    </Typography>
                    <Button
                        variant='outlined'
                        fullWidth={true}
                        color='primary'
                        onClick={googleLogin}
                        className={classes.buttonGoogle}
                        startIcon={<MessageOutlined />}
                    >
                        Google Sign In
                    </Button>
                </div>
            </Container>
            <AlertSnackbar
                isOpen={isSnackOpen}
                message={error}
                type='error'
                closeCallback={handleAlertClosing}
            />
        </>
    );
};

export default Login;
