import React from 'react';
import {Grid} from '@material-ui/core';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Footer from './Footer';

const style = {
    Paper: {
        padding: '1.3em',
        marginTop: '0.8em',
        marginBottom: '0.8em',
    },
};
export default () => <><Grid container spacing={16}>
    <Grid item sm>
        <LeftPanel style={style}>
            Content 1
        </LeftPanel>
    </Grid>
    <Grid item sm>
        <RightPanel style={style}>
            Content 2
        </RightPanel>
    </Grid>
</Grid>
    <Footer/>
</>