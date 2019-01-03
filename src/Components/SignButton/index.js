import React from 'react';
import Button from '@material-ui/core/Button';
import withAuthorization from '../Session/withAuthorization';

const SignButton = ({authorized, onSignClick}) => <Button color="inherit"
                                                          onClick={onSignClick}>{authorized ? 'Logout' : 'Login'}</Button>;

export default withAuthorization(({onSignInClick, onSignOutClick, authUser}) => {

        const authorized = !!authUser;

        const callback = authorized ? onSignOutClick : onSignInClick;
        return <>
            <SignButton
                onSignClick={callback}
                authorized={authorized}
            />
        </>;
    },
);


