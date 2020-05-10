import React, {
    ChangeEvent,
    useState,
    FormEvent,
} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import FacebookIcon from '@material-ui/icons/Facebook';

import {
    makeStyles,
    Theme,
    Avatar,
    Typography,
    TextField,
    Button,
    IconButton,
} from '@material-ui/core';

import Loading from '../Loading/Loading';

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
        marginBottom: theme.spacing(2)
    },
    avatar: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(10),
        '& .buttonsContainer': {
            display:'flex',
            marginTop: theme.spacing(2),
            '& .buttonFirst': {
                marginRight: theme.spacing(2)
            }
        }
    },
    placeholder: {
        marginTop: theme.spacing(5),
    },
    buttonFacebook: {
        marginTop: theme.spacing(2),
    },
    facebook: {
        background: '#4267B2',
    }
}));

const Login = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const handleUsername = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    }

    const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const canLogin = (): boolean => {
        return username !== '' &&
            password !== '';
    }

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!canLogin()) {
            return;
        }

        setIsLoading(true);
    }

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
                            fullWidth
                            required
                            onChange={handleUsername}
                            />
                        <TextField
                            label='Password'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            required
                            type='password'
                            autoComplete='password'
                            onChange={handlePassword}
                        />
                        <div className='buttonsContainer'>
                            <Button
                                className='buttonFirst'
                                variant='contained'
                                fullWidth
                                disabled={!canLogin()}
                                color='primary'
                                type='submit'
                            >
                                Sign In
                            </Button>
                            <Button
                                variant='outlined'
                                fullWidth
                                color='secondary'
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
                    <div>
                        <IconButton
                            component='span'
                            className={classes.buttonFacebook}
                        >
                            <Avatar classes={{
                                root: classes.facebook,
                            }}>
                                <FacebookIcon />
                            </Avatar>
                        </IconButton>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Login;