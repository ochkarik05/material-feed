import React from 'react';
import {
    Typography,
    Paper,
    TextField,
    Button,
    withStyles,
} from '@material-ui/core';

import withModal from './../Modal'

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

const SignInForm = ({onClose, open, classes}) => (

        <Paper className={classes.paper}>
            <form>
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
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                />
                <Button color="primary" className={classes.button}>
                    Login
                </Button>
            </form>
        </Paper>

);

const ModalSignIn = withModal(SignInForm);

export default withStyles(styles)(ModalSignIn);
