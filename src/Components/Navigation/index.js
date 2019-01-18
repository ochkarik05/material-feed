import React from 'react';
import * as ROUTES from '../../Constants/routes';
import * as ROLES from '../../Constants/roles';
import {withAuth} from '../Auth';
import {NavLink} from 'react-router-dom';

const condition = (authUser) => !!authUser;

let Navigation = ({authUser}) => {

  const guest = authUser.role === ROLES.GUEST;

  return <ul>
    <li>
      <NavLink to={ROUTES.HOME}>Home</NavLink>
    </li>
    <li>
      <NavLink to={guest ? ROUTES.SIGN_IN : ROUTES.SIGN_OUT}>{!guest ? 'Sign Out' : 'Sign In'}</NavLink>
    </li>
  </ul>;
};

export default withAuth(condition)(Navigation);
