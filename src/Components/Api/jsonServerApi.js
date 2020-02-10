import {API} from './api';

class JsonServerApi extends API {

  constructor() {
    super();
    console.log('API constructor');
  }

  getCategoryArticles(categoryId) {
    console.log('JsonServer getCategoryArticles()');
    super.getCategoryArticles(categoryId);
  }

  getArticleById() {
    console.log('JsonServer getArticleById()');
    super.getArticleById();
  }

}

export default JsonServerApi;
