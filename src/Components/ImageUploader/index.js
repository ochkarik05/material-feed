import React from 'react';
import {withFirebase} from '../Firebase';
import {compose} from 'recompose';
import {Button, CircularProgress, withStyles} from '@material-ui/core';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

const styles = theme => ({
  '@keyframes loading_bg_anim': {
    from: {
      backgroundColor: '#efefef',
    },
    to: {
      backgroundColor: '#aaa',
    },
  },

  container: {
    display: 'flex',
  },
  progress: {
    // textAlign: 'center'
  },
  upload: {
    fontSize: '3rem',
    display: 'flex',
    width: 60,
    height: 60,
    cursor: 'pointer',
    backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    width: '49%',
  },

  itemContainer: {
    width: '10em',
    height: '10em',
    display: 'flex',
    padding: '0.5em',
    margin: '1em',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },

  radioInput: {
    position: 'absolute',
    opacity: 0,
    display: 'inline',
    cursor: 'pointer',
  },

  loading: {
    animation: 'loading_bg_anim 2s infinite alternate',
  },
  image: {
    width: '100%',
    height: '7.5em',
    objectFit: 'cover',
  },
});

const testEntries =
  [
    [
      'Screenshot from 2018-11-27 13-44-35.png',
      {
        isUploading: false,
        progress: 100,
        // url: 'https://firebasestorage.googleapis.com/v0/b/react-firebase-9455b.appspot.com/o/images%2F0f892dea-cf31-408b-bd21-e2b13d7aefd3.png?alt=media&token=d667c61d-fc08-411c-89f3-a112a94e2435',
      },
    ], [
    'Screenshot from 2018-12-04 10-59-10.png',
    {
      isUploading: false,
      progress: 100,
      url: 'https://firebasestorage.googleapis.com/v0/b/react-firebase-9455b.appspot.com/o/images%2F9a349424-5e9a-42cb-a031-be8e6b86ee34.png?alt=media&token=a2eca0b0-31ab-436a-8927-6dbd0b44b9e6',
    },
  ], [
    'Screenshot from 2018-12-04 11-01-36.png',
    {
      isUploading: false,
      progress: 100,
      url: 'https://firebasestorage.googleapis.com/v0/b/react-firebase-9455b.appspot.com/o/images%2Fe6453c51-98df-4adb-a62b-c405c3706f3c.png?alt=media&token=369b91bf-30f1-458a-8d79-9bcafc1b81f5',
    },
  ], [
    'Screenshot from 2018-12-04 11-01-39.png',
    {
      isUploading: false,
      progress: 100,
      filename: 'd4262c8b-6da2-4367-afd8-b75bc39ca209.png',
      url: 'https://firebasestorage.googleapis.com/v0/b/react-firebase-9455b.appspot.com/o/images%2Fd4262c8b-6da2-4367-afd8-b75bc39ca209.png?alt=media&token=88a7d9b9-0720-4c25-907c-3e85c6b25424',
    },
  ]];

class ImageUploader extends React.Component {
  state = {
    imageMap: new Map(
      // testEntries,
    ),
  };

  handleUploadSuccess = (filename, task) => {

    this.setNewStateFromTask(task, {progress: 100, isUploading: false});

    const {firebase: {storage}} = this.props;

    storage
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setNewStateFromTask(task, {url: url, filename: filename}, () => console.log(this.state)));
  };

  handleUploadStart = (file) => {
    console.log(file);
    this.setNewState(file.name, {progress: 0, isUploading: true, url: undefined}, () => {
      console.log(this.state);
    });

  };

  handleProgress = (progress, task) => {
    console.log('hangle progress');
    this.setNewStateFromTask(task, {progress: progress});
  };

  handleDelete = (key, filename) => {


    this.setNewState(key, {url: '', progress: 80});

    const {firebase: {storage}} = this.props;
    storage
      .ref('images')
      .child(filename)
      .delete()
      .then(url => this.setState(prevState => {
        console.log('handleDelete, key: ' + key);
        console.log('deleted: ' + prevState.imageMap.delete(key));
        console.log(prevState.imageMap);
        return {imageMap: new Map([...prevState.imageMap])};
      }));

  };

  setNewStateFromTask = (task, newState, callback) => {

    let name = this.getFileName(task);
    console.log('setNewStateFromTask ' + name);

    this.setNewState(name, newState, callback);
  };

  setNewState(name, newState, callback) {

    this.setState(prevState => ({
      imageMap: new Map([...prevState.imageMap, [name, {...prevState.imageMap.get(name), ...newState}]]),
    }), callback);
  }

  getFileName = (task) => {
    return task.blob_.data_.name;
  };

  handleUploadError = (error, task) => {
    this.setNewStateFromTask(task, {isUploading: false});
  };

  handleImageClick = (url) => {
    const {onAddImage} = this.props;
    onAddImage(url);
  };

  render() {

    const {firebase: {storage}, classes} = this.props;
    const {imageMap} = this.state;
    return (
      <div className={classes.container}>
        {Array.from(imageMap, ([key, {url, progress, filename}]) =>
          url ?
            <label
              key={key}
              className={classes.itemContainer}>
              <input className={classes.radioInput} type="radio" name="radio"/>
              <span className="checkmark"/>
              <div className={classes.item}>
                <img className={classes.image}
                     src={url}
                     alt={key}
                />
                <div className={classes.buttons}>
                  <Button size="small" color="primary" className={classes.button}
                          onClick={() => this.handleImageClick(url)}
                          >
                    Add
                  </Button>
                  <Button size="small" color="secondary" className={classes.button}
                          onClick={() => this.handleDelete(key, filename)}>
                    Delete
                  </Button>
                </div>

              </div>
            </label> :
            <div
              key={key}
              className={[classes.itemContainer, classes.loading].join(' ')}>
              <CircularProgress
                className={classes.progress}
                variant="determinate"
                value={progress}
                color="secondary"
              />
            </div>,
        )
        }
        <div className={classes.itemContainer}>
          <div className={classes.upload}>

            <CustomUploadButton
              accept="image/*"
              randomizeFilename
              className={classes.upload}
              storageRef={storage.ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              multiple
            >
              +
            </CustomUploadButton>

          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withStyles(styles),
)(ImageUploader);



