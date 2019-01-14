import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    withStyles,
} from '@material-ui/core';

import Footer from './Footer';
import {AuthUserContext} from './../Session';
import {withFirebase} from '../Firebase';
import * as PropTypes from 'prop-types';
import './Article.css';
import ReactMarkdown from 'react-markdown';
import ListItemSecondaryAction from '@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import {Delete, Edit} from '@material-ui/icons';
import {compose} from 'recompose';

const styles = theme => ({
    paper: {
        overflow: 'auto',
    },
    container: {
        flexGrow: 1,
        padding: theme.spacing.unit,
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        overflow: 'hidden',
    },

    items: {
        minHeight: '8em',
        minWidth: '30%',
    },

    content: {
        flexGrow: 1,

        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing.unit,
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit,
        },

    },

});

class Articles extends React.Component {

    handleDelete = (article) => {

        const {firebase, onArticleDeleted} = this.props;

        console.log(article);
        firebase.deleteArticle(article)
            .then(() => onArticleDeleted())
            .catch(e => {
                throw e;
            });
    };

    handleEdit = (article) => {

        console.log(article)

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
                    <div className={classes.container}>
                        <Paper className={`${classes.paper}, ${classes.items }`}>
                            <List component="nav">
                                {
                                    categoryArticles.map(item =>
                                        <ListItem key={item.id} button onClick={() => onArticleSelected(item)}>
                                            <ListItemText primary={item.title}/>
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    onClick={() => this.handleEdit(item)}
                                                    disabled={!authUser}
                                                >
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => this.handleDelete(item)}
                                                    disabled={!authUser}
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>)
                                }
                            </List>
                        </Paper>
                        <Paper className={`${classes.paper}, ${classes.content }`}>
                            <ReactMarkdown
                                source={text}
                                className="article-content"
                            />
                        </Paper>
                    </div>
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
    withStyles(styles),
)(Articles);
