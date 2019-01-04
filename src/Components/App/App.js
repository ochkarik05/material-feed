import React, {Component} from 'react';
import Header from '../Header';
import Articles from '../Articles';
import withAuthentication from '../Session/withAuthentication';
import SignIn from './../SignIn';
import * as PropTypes from 'prop-types';
import Create from './../Articles/Dialogs/Create'

class App extends Component {

    state = {
        modalOpen: false,
        createDialogOpen: false,
        categories: [],
    };

    handleOpen = () => this.setState({
        modalOpen: true,
    });

    handleModalClose = () => this.setState({
        modalOpen: false,
    });

    handleSignOut = () => {
        this.props.firebase.signOut();
    };

    handleCreate = () => {
        this.setState({createDialogOpen: true})
    };

    handleCloseCreate = () => {
        this.setState({createDialogOpen: false})
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
                    this.onCategorySelected(categories[0]);
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
                    // articleContent: undefined
                });

            });
        });
    };

    onArticleSelected = (selectedArticle) => {

        const { article } = this.state;

        if(article && article.id === selectedArticle.id) return;

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
            modalOpen,
            createDialogOpen
        } = this.state;

        return <>

            <Header
                onSignInClick={this.handleOpen}
                onSignOutClick={this.handleSignOut}
                onCreateClick={this.handleCreate}
            />

            <Articles
                categories={categories}
                onCategorySelected={this.onCategorySelected}
                category={currentCategory}
                categoryArticles={articles}
                onArticleSelected={this.onArticleSelected}
                articleContent={articleContent}
            />

            <SignIn open={modalOpen} onClose={this.handleModalClose}/>

            <Create open={createDialogOpen} onClose={this.handleCloseCreate}/>

        </>;
    }

}

App.propTypes = {
    firebase: PropTypes.object.isRequired,
};

export default withAuthentication(App);
