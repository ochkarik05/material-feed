import React from 'react';
import AuthUserContext from './context';

export default Component => props => (<AuthUserContext.Consumer>
    {authUser =>
        <Component authUser={authUser} {...props} />
    }
</AuthUserContext.Consumer>);

