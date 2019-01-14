import React from 'react';
import {
    AppBar,
    Typography,
    Toolbar,
    withStyles,
} from '@material-ui/core';

import SignIn from './../SignIn';
import Create from '../Articles/Dialogs/Create';
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

const HeaderBase = ({classes, onArticleCreate, onCreateOpen, onCreateToggle}) =>

    <AppBar position="static" color="default">
        <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                {console.log(classes)}
                Firebase News Feed
            </Typography>

            <Create
                onArticleCreate={onArticleCreate}
                handleToggle={onCreateToggle}
                open={onCreateOpen}
            />

            <SignIn/>

        </Toolbar>
    </AppBar>;

HeaderBase.propTypes = {
    onArticleCreate: PropTypes.func.isRequired,
    onCreateOpen: PropTypes.bool.isRequired,
    onCreateToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

let Header = withStyles(styles)(HeaderBase);


Header.propTypes = {
    onArticleCreate: PropTypes.func.isRequired,
    onCreateOpen: PropTypes.bool.isRequired,
    onCreateToggle: PropTypes.func.isRequired,
};

export default Header;