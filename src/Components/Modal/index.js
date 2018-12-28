import React from 'react';
import {Modal} from '@material-ui/core';

export default Component => ({onClose, open, ...props}) =>

    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
    >
        <Component {...props}/>
    </Modal>

