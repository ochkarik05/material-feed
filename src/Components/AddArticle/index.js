import React from 'react';
import withAuthorization from '../Session/withAuthorization';
import IconButton from '@material-ui/core/IconButton';
import { Add } from '@material-ui/icons';

export default withAuthorization(({authUser, onClick} )=> (<>
    <IconButton color="inherit" disabled={!authUser} onClick={onClick}>
        <Add/>
    </IconButton>
</>));
