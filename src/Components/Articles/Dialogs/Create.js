import React from 'react';
import AddArticle from './AddButton';
import * as PropTypes from 'prop-types';

const CreateDialog = props => {

  const {handleToggle} = props;

  return <>
    <AddArticle onClick={handleToggle}/>
  </>;

};

CreateDialog.propTypes = {
  handleToggle: PropTypes.func.isRequired,

};

export default CreateDialog;
