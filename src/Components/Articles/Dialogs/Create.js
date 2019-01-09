import React, {Component} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    withStyles,
} from '@material-ui/core';

import AddArticle from './../../AddArticle';
import {withFirebase} from '../../Firebase';
import {compose} from 'recompose';
import * as PropTypes from 'prop-types';

const styles = theme => ({
    content: {
        marginBottom: '1em',
    },
});

const WRONG_ID = '__WRONG_ID__';

class CreateDialog extends Component {

    state = {
        open: false,
        article: {
            title: '',
            image: '',
            description: '',
            category: {},
            content: '',
        },
        categories: [
            {categoryId: WRONG_ID, categoryName: 'New Category'},
        ],
    };

    onEnter = () => {

        this.props.firebase.getCategories().then(snapshot => {

            const categories = [
                {categoryId: WRONG_ID, categoryName: 'New Category'},
            ];

            snapshot.forEach(doc => {
                let item = {id: doc.id, ...doc.data()};
                categories.push(
                    {categoryId: item.id, categoryName: item.title}
                );
            });

            this.setState({categories});
        });
    };

    handleChange = (name) => ({target: {value}}) => {

        const param = this.getStateParam(name, value);

        this.setState((prevState) => ({
            article: {
                ...prevState.article,
                ...param,
            },
        }));

    };

    getStateParam(name, value) {

        const {categories} = this.state;

        if (name === 'categoryName') {
            return {category: {...categories[0], categoryName: value}};
        } else if (name === 'category') {
            return {category: categories.find((v) => v.categoryId === value)};
        } else {
            return {[name]: value};
        }

    }

    handleToggle = () => {

        this.setState(prev => ({
            open: !prev.open,
        }));

    };

    handleCreate = () => {
        const {
            article: {
                title,
                image,
                description,
                content,
                category: {categoryId = WRONG_ID, categoryName = 'Create New'},
            },
        } = this.state;

        let promise;

        if (categoryId === WRONG_ID) {
            promise = this.saveCategory(categoryName);
        } else {
            promise = Promise.resolve(categoryId);
        }

        promise.then(categoryId =>
            this.saveArticle(categoryId, title, image, description, content).then(() => categoryId),
        ).then((categoryId) => {
            this.handleToggle();
            this.props.onArticleCreate(categoryId);
        }).catch(e => {
            console.log(e);
        });

    };

    saveArticle = (categoryId, title, image, description, content) => {
        return this.props.firebase.saveArticle(categoryId, title, image, description, content);
    };

    saveCategory = (categoryName) => {
        return this.props.firebase.addCategory(categoryName);
    };

    render() {

        const {
            open, article: {
                title,
                image,
                description,
                content,
                category: {categoryId = WRONG_ID, categoryName = 'Create New'},
            },
            categories,
        } = this.state;

        const {classes} = this.props;

        return <>

            <AddArticle onClick={this.handleToggle}/>

            <Dialog
                open={open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title"
                onEnter={this.onEnter}
            >
                <DialogTitle id="form-dialog-title">Add article</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.content}
                    >
                        To add article, fill out fields below.
                    </DialogContentText>
                    <FormControl>
                        <InputLabel
                            htmlFor="age-helper"
                        >
                            Category
                        </InputLabel>
                        <Select
                            autoFocus
                            value={categoryId}
                            onChange={this.handleChange('category')}
                            fullWidth
                        >
                            {categories.map(cat =>
                                <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</MenuItem>,
                            )}
                        </Select>
                    </FormControl>

                    {categoryId === WRONG_ID &&
                    <TextField
                        margin="normal"
                        type="text"
                        label="Category Name"
                        fullWidth
                        value={categoryName}
                        onChange={this.handleChange('categoryName')}
                    />}
                    <TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={this.handleChange('title')}
                    />

                    <TextField
                        margin="dense"
                        label="Image"
                        type="text"
                        fullWidth
                        value={image}
                        onChange={this.handleChange('image')}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={this.handleChange('description')}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        type="text"
                        multiline
                        rows={20}
                        fullWidth
                        value={content}
                        onChange={this.handleChange('content')}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleToggle} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

        </>;
    }

}

CreateDialog.propTypes = {
    onArticleCreate: PropTypes.func.isRequired,
};

export default compose(withFirebase, withStyles(styles))(CreateDialog);
