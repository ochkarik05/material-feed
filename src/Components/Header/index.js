import React from 'react';
import {
    AppBar,
    Typography,
    Toolbar,
    withStyles,
} from '@material-ui/core';

import SignIn from './../SignIn';
import Create from './../Articles/Dialogs/Create'
import * as PropTypes from 'prop-types';

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

const HeaderBase = ({ classes, onArticleCreate }) =>

    <div className={classes.root}>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    {console.log(classes)}
                    Firebase News Feed
                </Typography>

                <Create onArticleCreate={onArticleCreate}/>

                <SignIn />

            </Toolbar>
        </AppBar>
    </div>;

HeaderBase.propTypes = {
    onArticleCreate: PropTypes.func.isRequired
};

export default withStyles(styles)(HeaderBase);