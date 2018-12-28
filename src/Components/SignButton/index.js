import React from 'react';
import Button from '@material-ui/core/Button';
import { AuthUserContext } from './../Session'

const SignButton = ({authorized, onSignClick}) => <Button color="inherit" onClick={onSignClick}>{authorized ? "Logout":"Login"}</Button>;

export default ({onSignInClick, onSignOutClick}) => <AuthUserContext.Consumer>

    {authUser => {

        const authorized = !!authUser;

        const callback = authorized ? onSignOutClick : onSignInClick;

        return <SignButton onSignClick={callback} authorized={authorized}/>;
    }}
</AuthUserContext.Consumer>;
