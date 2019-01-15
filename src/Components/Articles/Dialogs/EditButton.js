import React from 'react';
import withAuthorization from '../../Session/withAuthorization';
import IconButton from '@material-ui/core/IconButton';
import {Edit} from '@material-ui/icons';

export default withAuthorization(({authUser, onClick}) => (<>
  <IconButton color="inherit" disabled={!authUser} onClick={onClick}>
    <Edit/>
  </IconButton>
</>));
