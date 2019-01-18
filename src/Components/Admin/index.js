import React from 'react';
import {withAuth} from '../Auth';

const condition = (authUser) => authUser != null;

const Admin = ({authUser}) => <>
  <h1>Admin Zone</h1>
  <p>Authorized: {(!!authUser).toString()}</p>
</>;

export default withAuth(condition)(Admin);

