import React from 'react';
import withAuthorization from '../Session/withAuthorization';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

export default withAuthorization(({authUser, onClick} )=> (<>
    <IconButton color="inherit" disabled={!authUser} onClick={onClick}>
        <AddIcon/>
    </IconButton>
</>));