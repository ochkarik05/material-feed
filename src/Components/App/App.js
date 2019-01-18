import React, {Component} from 'react';
import {compose} from 'recompose';
import {withErrorBoundaries} from '../ErrorBoundary';
import {withStyles} from '@material-ui/core';
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
import Admin from '../Admin';
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

class App extends Component {

  state = {};

  componentDidMount() {
    // this.updateRecords();

  }

  // updateRecords = (categoryId) => {
  //   this.props.firebase.getCategories().then(snapshot => {
  //     const categories = [];
  //
  //     snapshot.forEach(doc => {
  //       let item = {id: doc.id, ...doc.data()};
  //       categories.push(item);
  //     });
  //
  //     this.setState(() => ({
  //         categories: categories,
  //       }),
  //       () => {
  //         if (categories.length > 0) {
  //           const index = categories.findIndex(c => c.id === categoryId);
  //           const indexActual = (index !== -1) ? index : 0;
  //           let category = categories[indexActual];
  //           this.onCategorySelected(category);
  //
  //         }
  //       },
  //     );
  //
  //   });
  // };

  // handleArticleCreate = (categoryId) => {
  //   this.updateRecords(categoryId);
  // };

  // toggleArticleDialog = () => {
  //
  //   console.log('toggleArticleDialog');
  //   this.setState(prevState => ({
  //     createDialogOpen: !prevState.createDialogOpen,
  //   }));
  // };

  // onArticleSelected = (selectedArticle) => {
  //
  //   const {article} = this.state;
  //
  //   if (article && article.id === selectedArticle.id) return;
  //
  //   this.setState(() => ({
  //     articleContent: {text: 'Loading...'},
  //     article: selectedArticle,
  //   }), () => {
  //     selectedArticle.content.get().then(content => {
  //
  //       const text = content.data().text.replace(/\\n/g, '\n');
  //
  //       this.setState({
  //         articleContent: {text: text},
  //       });
  //     });
  //   });
  //
  // };

  render() {

    return <Router>
      <>

        <Navigation/>

        <Switch>

          <Route exact path={ROUTES.HOME} render={() => <Dashboard/>}/>

          <Route path={ROUTES.ADMIN} render={() => <Admin/>}/>

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

