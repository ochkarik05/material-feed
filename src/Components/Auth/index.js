import React from 'react';
import { AuthWithFirebase } from './firebaseAuth'

const AuthContext = React.createContext(null);

export const withAuth = condition => Component => props => (

  <AuthContext.Consumer>
    {({authUser, authProvider}) => condition(authUser) ?
      <Component {...props}
                 authUser={authUser}
                 authProvider={authProvider}/>
      : null
    }
  </AuthContext.Consumer>

);

export const withAuthProvider = provider => Component => {
  class AuthProvider extends React.Component {

    state = {
      authUser: null,
    };

    constructor(props) {
      super(props);
      console.log('constructor');

    }

    componentDidMount() {

      this.unregister = provider.registerCallback((authUser) => {
        this.setState({authUser});
      });
    }

    componentWillUnmount() {
      this.unregister();
    }

    render() {
      return <AuthContext.Provider value={{
        authUser: this.state.authUser,
        authProvider: provider,
      }}>
        <Component {...this.props}/>
      </AuthContext.Provider>;
    }
  }

  return AuthProvider;
};

export {AuthWithFirebase}
