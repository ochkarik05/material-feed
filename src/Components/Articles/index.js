import React from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    withStyles
} from '@material-ui/core';

import Footer from './Footer';
import {AuthUserContext} from './../Session';
import {withFirebase} from '../Firebase';
import * as PropTypes from 'prop-types';
import './Article.css';
import ReactMarkdown from 'react-markdown';
import ListItemSecondaryAction from '@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import {Delete} from '@material-ui/icons';
import {compose} from 'recompose';

const styles = theme => ({
    paper: {
        height: '100%',
        overflow: 'auto',
    },

    container: {
        flexGrow: 1,
        padding: theme.spacing.unit,
    },

});

class Articles extends React.Component {

    handleDelete = (article) => {

        const {firebase, onArticleDeleted} = this.props;

        console.log(article);
        firebase.deleteArticle(article)
            .then(() => onArticleDeleted())
            .catch( e => {throw e;} );
    };

    render() {

        const {
            classes,
            categoryArticles,
            onArticleSelected,
            articleContent: {text} = {text: 'Select article from the left'},
        } = this.props;

        console.log(text);

        return <AuthUserContext.Consumer>
            {authUser => {
                console.log(authUser);
                return <>
                    <Grid
                        container
                        spacing={16}
                        wrap={'nowrap'}
                        className={classes.container}
                    >
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <List component="nav">
                                    {
                                        categoryArticles.map(item =>
                                            <ListItem key={item.id} button onClick={() => onArticleSelected(item)}>
                                                <ListItemText primary={item.title}/>
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => this.handleDelete(item)}>
                                                        <Delete/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>)
                                    }
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <ReactMarkdown
                                    source={text}
                                    className="article-content"
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    < Footer {...this.props}/>
                </>;
            }
            }
        </AuthUserContext.Consumer>;

    }
}

Articles.propTypes = {
    firebase: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    onCategorySelected: PropTypes.func.isRequired,
    category: PropTypes.object,
    categoryArticles: PropTypes.array,
    onArticleSelected: PropTypes.func.isRequired,
    articleContent: PropTypes.object,
    onArticleDeleted: PropTypes.func,
};

export default compose(
    withFirebase,
    withStyles(styles)
)(Articles);
