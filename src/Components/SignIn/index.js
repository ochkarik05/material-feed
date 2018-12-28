import React from 'react';
import {
    Typography,
    Paper,
    TextField,
    Button,
    withStyles,
} from '@material-ui/core';

import withModal from './../Modal';
import {withFirebase} from '../Firebase';
import {compose} from 'recompose';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
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
        } = this.state;

        const isInvalid =
            email === '' ||
            password === '';

        return (

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
                    <Button type="submit" color="primary" className={classes.button} disabled={isInvalid}>
                        Login
                    </Button>
                </form>
            </Paper>

        );
    }
}

export default compose(
    withStyles(styles),
    withModal,
    withFirebase
    )(SignInForm);
