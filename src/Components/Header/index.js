import React from 'react';
import {AppBar, Toolbar, Typography, withStyles} from '@material-ui/core';

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

const HeaderBase = ({classes, onCreateToggle}) =>

  <AppBar position="static" color="default">
    <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        {console.log(classes)}
        Firebase News Feed
      </Typography>

      <Create
        handleToggle={onCreateToggle}/>

      <SignIn/>

    </Toolbar>
  </AppBar>;

HeaderBase.propTypes = {
  onCreateToggle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

let Header = withStyles(styles)(HeaderBase);

Header.propTypes = {
  onCreateToggle: PropTypes.func.isRequired,
};

export default Header;
