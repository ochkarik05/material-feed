import {API} from './api';

class FirebaseApi extends API{

  constructor(){
    super();
    console.log("API constructor");
  }

  getCategoryArticles(categoryId) {
    console.log("Firebase getCategoryArticles()")
  }

  getArticleById() {
    console.log("Firebase getArticleById()")
  }
}

export default FirebaseApi
