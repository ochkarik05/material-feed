import React from 'react';
import withAuthorization from '../Session/withAuthorization';

const Admin = ({authUser}) => <>
  <h1>Admin Zone</h1>
  <p>Authorized: {(!!authUser).toString()}</p>
</>;

export default withAuthorization(Admin);

