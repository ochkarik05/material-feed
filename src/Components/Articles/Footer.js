import React from 'react';
import {Tabs, Tab, withStyles, withWidth} from '@material-ui/core';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

const styles = {
    tabContainer: {
        boxShadow: '0 0 5px #ccc',
    }
};

class Footer extends React.Component {

    handleChange = (event, value) => {
        this.props.onCategorySelected(this.props.categories[value]);
    };

    render() {

        const {categories, category, classes, width} = this.props;

        const cellIndex = categories.findIndex(cat => cat === category);

        return <div className={classes.tabContainer}>
            <Tabs
                value={cellIndex}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable={width === 'sm' || width === 'xs'}
                centered={width !== 'sm' || width !== 'xs'}
            >
                {categories && categories.map(
                    cat => <Tab key={cat.id} label={cat.title}/>,
                )}
            </Tabs>
        </div>;

    }
}

Footer.propTypes = {
    // firebase: PropTypes.object.isRequired,
    onCategorySelected: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    currentCategory: PropTypes.object
};

export default compose(withStyles(styles), withWidth())(Footer);
