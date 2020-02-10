import React, {Component} from 'react';
import {compose} from 'recompose';
import {withErrorBoundaries} from '../ErrorBoundary';
import {withStyles} from '@material-ui/core';
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
import Admin, {Create, Delete, Edit} from '../Admin';
import {withApiProvider} from '../Api';
import Dashboard from '../AticleList';
import Navigation from '../Navigation';
import {AuthWithFirebase} from '../Auth';
import Firebase, {FirebaseContext} from '../Firebase';
import {withAuthProvider} from '../Auth';
import FirebaseUi from '../FirebaseUiAuth';
import SignOut from '../SignOut'

const styles = theme => {

};


const INITIAL_ARTICLE = {
  title: 'Default Title',
  image: '',
  description: '',
  category: {},
  content: '',
};

class App extends Component {

  state = {};


  render() {

    return <Router>
      <>

        <Navigation/>

        <Switch>

          <Route exact path={ROUTES.HOME} render={() => <Dashboard/>}/>

          <Route exact path={ROUTES.CREATE} render={() => <Create loadArticle={() => Promise.resolve(INITIAL_ARTICLE)}/>}/>
          <Route path={ROUTES.DELETE} component={Delete}/>
          <Route path={ROUTES.EDIT} component={Edit}/>

          <Route exact path={ROUTES.ADMIN} render={() => <Admin/>}/>


          <Route path={ROUTES.ARTICLE} render={({match: {params: {articleId}}}) => {
            console.log(articleId);
            return <h1>Article</h1>;
          }}/>

          <Route path={ROUTES.SIGN_IN} component={FirebaseUi}/>
          <Route path={ROUTES.SIGN_OUT} component={SignOut}/>


          <Route path={ROUTES.NOT_FOUND} render={() => {
            return <>
              <h1>Not Found</h1>
              <NavLink to={ROUTES.HOME}>Home</NavLink>
            </>;
          }}/>


          <Route render={() => <Redirect to={ROUTES.NOT_FOUND}/>}/>

        </Switch>
      </>

    </Router>;
  }

}

const firebase = new Firebase();
const auth = new AuthWithFirebase(firebase);

const withFirebaseProvider = Component => props => <FirebaseContext.Provider value={firebase}>
  <Component {...props} />
</FirebaseContext.Provider>;



export default compose(
  withErrorBoundaries,
  withFirebaseProvider,
  withAuthProvider(auth),
  withApiProvider,
  withStyles(styles),
)(App);

