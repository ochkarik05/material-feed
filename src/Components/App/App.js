import React, {Component} from 'react';
import Header from '../Header';
import Articles from '../Articles';
import withAuthentication from '../Session/withAuthentication';
import {compose} from 'recompose';
import * as PropTypes from 'prop-types';
import {withErrorBoundaries} from '../ErrorBoundary';
import {withStyles} from '@material-ui/core';
import ArticleDialog from '../Articles/Dialogs/ArticleDialog';

const styles = {
  '@global': {
    '#root': {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
    },
  },
};

class App extends Component {

  state = {
    categories: [],
    createDialogOpen: false,
  };

  componentDidMount() {
    this.updateRecords();

  }

  updateRecords = (categoryId) => {
    this.props.firebase.getCategories().then(snapshot => {
      const categories = [];

      snapshot.forEach(doc => {
        let item = {id: doc.id, ...doc.data()};
        categories.push(item);
      });

      this.setState(() => ({
          categories: categories,
        }),
        () => {
          if (categories.length > 0) {
            const index = categories.findIndex(c => c.id === categoryId);
            const indexActual = (index !== -1) ? index : 0;
            let category = categories[indexActual];
            this.onCategorySelected(category);

          }
        },
      );

    });
  };

  handleArticleCreate = (categoryId) => {
    this.updateRecords(categoryId);
  };

  toggleArticleDialog = () => {

    console.log('toggleArticleDialog');
    this.setState(prevState => ({
      createDialogOpen: !prevState.createDialogOpen,
    }));
  };

  onCategorySelected = (currentCategory) => {
    this.setState(() => ({currentCategory}),
      () => {

        currentCategory.records.collection('records').get().then(snapshot => {

          const articles = [];

          snapshot.forEach(doc => {
            let item = {id: doc.id, ...doc.data()};
            articles.push(item);
          });

          this.setState({
            articles: articles,
          });

        });
      });
  };

  onArticleSelected = (selectedArticle) => {

    const {article} = this.state;

    if (article && article.id === selectedArticle.id) return;

    this.setState(() => ({
      articleContent: {text: 'Loading...'},
      article: selectedArticle,
    }), () => {
      selectedArticle.content.get().then(content => {

        const text = content.data().text.replace(/\\n/g, '\n');
        // console.log(text);

        this.setState({
          articleContent: {text: text},
        });
      });
    });

  };

  render() {

    const {
      categories,
      currentCategory,
      articles = [],
      articleContent,
      createDialogOpen,
    } = this.state;

    return <>

      <Header
        onCreateToggle={this.toggleArticleDialog}
      />

      <Articles
        categories={categories}
        onCategorySelected={this.onCategorySelected}
        category={currentCategory}
        categoryArticles={articles}
        onArticleSelected={this.onArticleSelected}
        articleContent={articleContent}
        onArticleDeleted={this.updateRecords}
      />

      <ArticleDialog
        open={createDialogOpen}
        handleToggle={this.toggleArticleDialog}
        onArticleCreate={this.handleArticleCreate}
      />
    </>;
  }

}

App.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default compose(
  withAuthentication,
  withErrorBoundaries,
  withStyles(styles),
)(App);
