import React from 'react';
import {withAuth} from '../Auth';
import * as ROLES from '../../Constants/roles';
import PermissionDenied from '../PermissionDenied/index.';
import {compose} from 'recompose';
import {withApi} from '../Api';

const condition = (authUser) => !!authUser;

const checkRole = (authUser) => authUser.role === ROLES.ADMIN;

class Admin extends React.Component {

  componentDidMount() {
    const {api} = this.props;
    api.getArticleById();
  }

  render() {

    const {authUser} = this.props;

    return <>
      <h1>Admin Zone</h1>
      <p>Authorized:</p>
      <p>Username: {authUser.username} </p>
      <p>Role: {authUser.role} </p>
    </>;
  }

}


const withRole = Component => (props) => {

  const {authUser} = props;

  if (checkRole(authUser)) {
    return <Component {...props}/>;
  } else {
    return <PermissionDenied/>;
  }
};

export default compose(
  withAuth(condition),
  withRole,
  withApi,
)(Admin);

