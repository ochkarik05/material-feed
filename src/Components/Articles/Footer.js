import React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';
import {withFirebase} from '../Firebase';

class Footer extends React.Component {

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

            console.log(categories);

            this.setState({
                categories: categories,
            });


        });
    }

    render() {
        return <Paper elevation={1}><Tabs
            value={0}
            // onChange={this.handleChange}
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

export default withFirebase(Footer);