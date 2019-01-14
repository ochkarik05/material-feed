import React from 'react';
import AddArticle from './../../AddArticle';
import ArticleDialog from './ArticleDialog';
import * as PropTypes from 'prop-types';

const CreateDialog = props => {

    const { handleToggle, open, onArticleCreate } = props;

    return <>
        <AddArticle onClick={handleToggle}/>
        <ArticleDialog
            open={open}
            handleToggle={handleToggle}
            onArticleCreate={onArticleCreate}
        />
    </>;

};

CreateDialog.propTypes = {

    handleToggle: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

};

export default CreateDialog;
