import React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';
import PropTypes from 'prop-types';

class Footer extends React.Component {

    handleChange = (event, value) => {
        this.props.onCategorySelected(this.props.categories[value]);
    };

    render() {

        const {categories, category} = this.props;

        const cellIndex = categories.findIndex(cat => cat === category);

        return <Paper elevation={1}>
            <Tabs
                value={cellIndex}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {categories && categories.map(
                    cat => <Tab key={cat.id} label={cat.title}/>,
                )}
            </Tabs>
        </Paper>;

    }
}

Footer.propTypes = {
    // firebase: PropTypes.object.isRequired,
    onCategorySelected: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    currentCategory: PropTypes.object
};

export default Footer;