import React, {Component} from 'react';
import Header from '../Header';
import Articles from '../Articles';
import withAuthentication from '../Session/withAuthentication';
import {compose} from 'recompose';
import * as PropTypes from 'prop-types';
import {withErrorBoundaries} from '../ErrorBoundary';

class App extends Component {

    state = {
        categories: [],
    };

    componentDidMount() {

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
                        this.onCategorySelected(categories[0]);
                    }
                },
            );

        });

    }

    onCategorySelected = (currentCategory) => {
        this.setState(() => {
            return {currentCategory};
        }, () => {

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
        } = this.state;

        return <>

            <Header
                onSignInClick={this.handleOpen}
                onSignOutClick={this.handleSignOut}
            />

            <Articles
                categories={categories}
                onCategorySelected={this.onCategorySelected}
                category={currentCategory}
                categoryArticles={articles}
                onArticleSelected={this.onArticleSelected}
                articleContent={articleContent}
            />

        </>;
    }

}

App.propTypes = {
    firebase: PropTypes.object.isRequired,
};

export default compose(withAuthentication, withErrorBoundaries)(App);
