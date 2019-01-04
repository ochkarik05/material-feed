import React from 'react';
import {
  Dialog,DialogTitle,DialogContent,DialogContentText,TextField,DialogActions,Button
} from '@material-ui/core';

export default ({ open, onClose }) => {


  return <>

    <Dialog
        open={open}
        onClose={onClose}
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
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>

  </>;
};
