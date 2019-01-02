import React from 'react';
import {Grid} from '@material-ui/core';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Footer from './Footer';
import {AuthUserContext} from './../Session';
import {withFirebase} from '../Firebase';
import * as PropTypes from 'prop-types';

const style = {
    Paper: {
        padding: '1.3em',
        marginTop: '0.8em',
        marginBottom: '0.8em',
        height: 400,
    },
};

class Articles extends React.Component {

    state = {
        articles: [],
    };

    onCategorySelected = category => {

        category.records.collection('records').get().then(snapshot => {

            const articles = [];

            snapshot.forEach(doc => {
                let item = {id: doc.id, ...doc.data()};
                articles.push(item);
            });

            this.setState({
                articles,
            });

        });

    };

    render() {
        return <AuthUserContext.Consumer>
            {authUser => {
                console.log(authUser);
                return <>
                    <Grid container spacing={16}>
                        <Grid item sm>
                            <LeftPanel style={style}>
                                <ul>
                                    {
                                        this.state.articles.map(item =>
                                            <li key={item.id}>{item.title}</li>)
                                    }

                                </ul>
                            </LeftPanel>
                        </Grid>
                        <Grid item sm>
                            <RightPanel style={style}>
                                Select article from the left
                            </RightPanel>
                        </Grid>
                    </Grid>
                    < Footer onTabSelected={this.onCategorySelected}/>
                </>;
            }
            }
        </AuthUserContext.Consumer>;

    }
}

Articles.propTypes = {
    firebase: PropTypes.object.isRequired,
};

export default withFirebase(Articles);
