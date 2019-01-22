import React from 'react'
import EditForm from './EditForm';


class Create extends React.Component{

  state = {};

  componentDidMount() {
    this.props.loadArticle().then((article) => this.setState({article}))
  }

  handleChange = (name) => ({target: {value}}) => {

    this.setState((prevState) => ({
      article: {
        ...prevState.article,
        [name]: value
      },
    }));

  };

  handleInsertContent = (text, callback) => {

    this.setState((prevState) => (
      {
        article: {
          ...prevState.article,
          content: prevState.article.content + text
        },

      }
    ), callback)

  };
  render() {

    const {article = {}} = this.state;

    console.log(article);

    return <EditForm article={article} onHandleChange={this.handleChange} onInsertContent={this.handleInsertContent}

    />
  }

}


export default Create;


