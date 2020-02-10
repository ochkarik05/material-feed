import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Add} from '@material-ui/icons';
import {withAuth} from '../../Auth';

export default withAuth(()=>true)(({authUser, onClick}) => (<>
  <IconButton color="inherit" disabled={!authUser} onClick={onClick}>
    <Add/>
  </IconButton>
</>));
