import React from 'react';
import {
    AppBar,
    Typography,
    Toolbar,
    Button, withStyles,
} from '@material-ui/core';

const styles = {
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
};

const HeaderBase = ({classes, onSignClick}) =>

    <div className={classes.root}>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    {console.log(classes)}
                    Firebase News Feed
                </Typography>
                <Button color="inherit" onClick={onSignClick}>Login</Button>
            </Toolbar>
        </AppBar>
    </div>;

export default withStyles(styles)(HeaderBase);