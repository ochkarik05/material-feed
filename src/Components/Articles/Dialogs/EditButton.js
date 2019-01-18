import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Edit} from '@material-ui/icons';
import {withAuth} from '../../Auth';

const condition = authUser => !!authUser;

export default withAuth(condition)(({authUser, onClick}) => (<>
  <IconButton color="inherit" disabled={!authUser} onClick={onClick}>
    <Edit/>
  </IconButton>
</>));
