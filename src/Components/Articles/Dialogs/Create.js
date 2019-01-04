import React, {Component} from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button,
} from '@material-ui/core';

import AddArticle from './../../AddArticle';

export default class extends Component {

    state = {
        open: false,
        article: {
            title: '',
            image: '',
            description: '',
            content: '',
            category: '',
        },
    };

    handleChange = (name) => ({target: {value}}) => {

        this.setState((prevState) => ({
            article: {
                ...prevState.article,
                [name]: value,
            },
        }));

    };

    handleToggle = () => {

        this.setState(prev => ({
            open: !prev.open,
        }));

    };

    render() {

        const {
            open, article: {
                title,
                image,
                description,
                content,
                category,
            },
        } = this.state;

        return <>

            <AddArticle onClick={this.handleToggle}/>

            <Dialog
                open={open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add article</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add article, fill out fields below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={this.handleChange('title')}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Image"
                        type="text"
                        fullWidth
                        value={image}
                        onChange={this.handleChange('image')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={this.handleChange('description')}
                    />
                    <TextField
                        autoFocus
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
                    <Button onClick={this.handleToggle} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

        </>;
    }

}
