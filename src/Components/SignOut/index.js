import React from 'react';
import * as ROUTES from '../../Constants/routes';
import {Redirect} from 'react-router';
import {withAuth} from '../Auth';

class SignOut extends React.Component {

  state = {
    signedOut: false,
  };

  componentDidMount() {

    const {authProvider} = this.props;

    console.log("Signing out");

    authProvider.signOut().then(() => {
      this.setState({
        signedOut: true,
      });
    });

  }

  render() {
    const {signedOut} = this.state;

    console.log(signedOut);

    if (signedOut) {
      return <Redirect to={ROUTES.HOME}/>;
    } else {
      return <p>Signing out...</p>;
    }
  }

}

export default withAuth(()=> true)(SignOut);
