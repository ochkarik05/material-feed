import React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';
import {withFirebase} from '../Firebase';
import PropTypes from 'prop-types';

class Footer extends React.Component {

    state = {
        categories: [],
        value: 0,
    };

    componentDidMount() {

        this.props.firebase.getCategories().then(snapshot => {
            const categories = [];

            snapshot.forEach(doc => {
                let item = {id: doc.id, ...doc.data()};
                categories.push(item);
            });

            console.log(categories);

            this.setState({
                categories: categories,
                value: 0,
            });

            this.props.onTabSelected(categories[0]);

        });
    }

    handleChange = (event, value) => {
        this.props.onTabSelected(this.state.categories[value]);
        this.setState({value});
    };

    render() {
        return <Paper elevation={1}>
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {this.state.categories.map(
                    cat => <Tab key={cat.id} label={cat.title}/>,
                )}
            </Tabs>
        </Paper>;

    }
}

Footer.propTypes = {
    firebase: PropTypes.object.isRequired,
    onTabSelected: PropTypes.func.isRequired,
};

export default withFirebase(Footer);