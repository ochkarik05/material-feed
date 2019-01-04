import React from 'react';
import {
    AppBar,
    Typography,
    Toolbar,
    withStyles,
} from '@material-ui/core';

import SignButton from './../SignButton';
import Create from './../Articles/Dialogs/Create'

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

const HeaderBase = ({classes, onSignInClick, onSignOutClick, onCreateClick}) =>

    <div className={classes.root}>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    {console.log(classes)}
                    Firebase News Feed
                </Typography>

                <Create />

                <SignButton
                    color="inherit"
                    onSignOutClick={onSignOutClick}
                    onSignInClick={onSignInClick}>

                    Login
                </SignButton>
            </Toolbar>
        </AppBar>
    </div>;

export default withStyles(styles)(HeaderBase);