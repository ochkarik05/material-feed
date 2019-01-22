import React from 'react';
import {Button, TextField, withStyles} from '@material-ui/core';
import ImageUploader from '../ImageUploader';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fileInput: {
    display: 'none',
  },
});

class EditForm extends React.Component {

  myRef = React.createRef();

  handleAddImage = (link) => {
    const {  onInsertContent } = this.props;
    const text=`![Article Image](${link})`;
    onInsertContent(text, () => {

      console.log("Callback");
      const textField = this.myRef.current;
      textField.focus();

      const to = textField.textLength;
      const from = to - text.length;

      textField.setSelectionRange(from, to)
    });
  };

  render() {

    const {
      article: {
        title = '',
        image = '',
        description = '',
        content = '',
      },
      onHandleChange,
      classes,
    } = this.props;
    return <form>

      <TextField
        margin="dense"
        label="Title"
        type="text"
        value={title}
        autoFocus
        onChange={onHandleChange('title')}
      />
      <br/>
      <ImageUploader
        onAddImage={this.handleAddImage}
      />
      <br/>
      <TextField
        margin="dense"
        label="Image"
        type="text"
        value={image}
        onChange={onHandleChange('image')}
      />
      <br/>
      <TextField
        margin="dense"
        label="Description"
        type="text"
        value={description}
        onChange={onHandleChange('description')}
      />
      <br/>
      <TextField
        margin="dense"
        label="Content"
        type="text"
        inputRef={this.myRef}
        multiline
        rows={20}
        fullWidth
        value={content}
        onChange={onHandleChange('content')}
      />
    </form>;
  }

}

export default withStyles(styles)(EditForm);
