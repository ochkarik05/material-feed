import React, {Component} from 'react';
import {
  Dialog,DialogTitle,DialogContent,DialogContentText,TextField,DialogActions,Button
} from '@material-ui/core';

import AddArticle from './../../AddArticle'

export default class extends Component {

  state = {
    open: false,
  };

  handleToggle = () => {

    this.setState(prev => ({
      open: !prev.open,
    }));

  };

  render() {

    const { open } = this.state;

    return <>

      <AddArticle onClick={this.handleToggle}/>

      <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleToggle} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleToggle} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

    </>;
  }

}
