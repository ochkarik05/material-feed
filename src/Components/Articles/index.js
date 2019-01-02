import React from 'react';
import {Grid} from '@material-ui/core';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Footer from './Footer';
import {AuthUserContext} from './../Session';

const style = {
    Paper: {
        padding: '1.3em',
        marginTop: '0.8em',
        marginBottom: '0.8em',
    },
};
export default () => <AuthUserContext.Consumer>
    {authUser => {
        console.log(authUser);
        return <><Grid container spacing={16}>
            <Grid item sm>
                <LeftPanel style={style}>
                    {authUser ? authUser.name || authUser.email : 'Unauthorized'}
                </LeftPanel>
            </Grid>
            <Grid item sm>
                <RightPanel style={style}>
                    Content 2
                </RightPanel>
            </Grid>
        </Grid>
            < Footer/>
        </>;
    }
    }
</AuthUserContext.Consumer>