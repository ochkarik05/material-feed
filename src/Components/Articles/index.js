import React from 'react';
import {Grid, List, ListItem, ListItemText} from '@material-ui/core';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Footer from './Footer';
import {AuthUserContext} from './../Session';
import {withFirebase} from '../Firebase';
import * as PropTypes from 'prop-types';
import './Article.css';

const style = {
    Paper: {
        marginTop: '0.8em',
        marginBottom: '0.8em',
        height: 500,
        overflow: 'auto',
    },

};

class Articles extends React.Component {

    createMarkup = (content) => ({
        __html: content,
    });

    render() {

        const {
            categoryArticles,
            onArticleSelected,
            articleContent: {text} = {text: 'Select article from the left'},
        } = this.props;

        console.log(text);

        return <AuthUserContext.Consumer>
            {authUser => {
                console.log(authUser);
                return <>
                    <Grid container spacing={16} wrap={'nowrap'}>
                        <Grid item xs={2}>
                            <LeftPanel style={style}>
                                <List component="nav">
                                    {
                                        categoryArticles.map(item =>
                                            <ListItem key={item.id} button onClick={() => onArticleSelected(item)}>
                                                <ListItemText primary={item.title}/>
                                            </ListItem>)
                                    }
                                </List>
                            </LeftPanel>
                        </Grid>
                        <Grid item xs={10}>
                            <RightPanel style={style}>
                                <div className='article-content' dangerouslySetInnerHTML={this.createMarkup(text)}/>
                            </RightPanel>
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
};

export default withFirebase(Articles);
