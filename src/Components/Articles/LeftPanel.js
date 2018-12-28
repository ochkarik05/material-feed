import React from 'react'
import Paper from '@material-ui/core/Paper';

export default ({ style, children}) =>
    <Paper style={style.Paper}>
        {children}
    </Paper>
