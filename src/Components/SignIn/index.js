import React from 'react';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Modal,
    withStyles,
} from '@material-ui/core';
import SignButton from './SignButton';
import {withFirebase} from '../Firebase';
import {compose} from 'recompose';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    open: false,
};

const styles = theme => ({

        paper: {
            top: '1.3em',
            bottom: '1.3em',
            left: '20%',
            right: '20%',
            position: 'fixed',
            padding: '1.3em',
        },

        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            display: 'block',
        },

        button: {
            margin: theme.spacing.unit,
        },
    }
);

class SignInForm extends React.Component {

    state = {...INITIAL_STATE};

    onSubmit = (e) => {

        e.preventDefault();

        const {email, password} = this.state;

        const {onClose} = this.props;

        this.props.firebase.signIn(email, password)
            .then(authUser => {
                console.log(authUser);
                this.setState({...INITIAL_STATE});
                onClose();

            })
            .catch(error => {
                this.setState({error});
            });
    };


    handleToggle = () => {

        this.setState(prev => ({
            open: !prev.open,
        }));

    };


    handleSignOut = () => {
        this.props.firebase.signOut();
    };

    onChange = event => {

        this.setState({
            [event.target.name]: event.target.value,
        });

    };

    render() {
        const {classes} = this.props;

        const {
            password,
            email,
            error,
            open,
        } = this.state;

        const isInvalid =
            email === '' ||
            password === '';

        return (

            <>
                <SignButton
                    color="inherit"
                    onSignOutClick={this.handleSignOut}
                    onSignInClick={this.handleToggle}/>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={this.handleToggle}
                >

                    <Paper className={classes.paper}>
                        <form onSubmit={this.onSubmit}>
                            <Typography variant="h6" id="modal-title">
                                Welcome to our place
                            </Typography>
                            <Typography variant="subtitle1" id="simple-modal-description">
                                Enter your credentials to continue as editor
                            </Typography>

                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                className={classes.textField}
                                type="email"
                                name="email"
                                autoComplete="email"
                                onChange={this.onChange}
                                value={email}
                                margin="normal"
                                variant="outlined"
                                autoFocus

                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                onChange={this.onChange}
                                value={password}
                                margin="normal"
                                variant="outlined"
                            />
                            {error && <p>{error.message}</p>}
                            <Button
                                type="submit"
                                color="primary"
                                className={classes.button}
                                disabled={isInvalid}
                            >
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Modal>
            </>

        );
    }
}

export default compose(
    withStyles(styles),
    withFirebase,
)(SignInForm);
