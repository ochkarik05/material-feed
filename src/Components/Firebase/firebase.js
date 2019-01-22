import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const settings = {timestampsInSnapshots: true};

export default class {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.app = app;
    this.firestore = app.firestore();
    this.firestore.settings(settings);
    this.database = app.database();
    this.storage = app.storage();
  }

  signOut = () => this.auth.signOut().then(() => {
    console.log('Signed Out');
  });

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  getCategories = () => this.firestore.collection('categories').get();
  getArticles = (ref) => ref.get();

  addCategory = (categoryName) => {
    const ref = this.firestore.collection('records').doc();
    return this.firestore.collection('categories').doc(ref.id).set({
      title: categoryName,
      records: ref,
    }).then(() => ref.id);
  };

  saveArticle = (categoryId, title, image, description, content) => {
    const {firestore} = this;
    return firestore.collection('articlesContent')
      .add({text: content, categoryId: categoryId})
      .then(docRef =>
        firestore.collection('records')
          .doc(categoryId).collection('records')
          .add({
            title: title,
            description: description,
            image: image,
            content: docRef,
            categoryId: categoryId,
          }));

  };

  editArticle(categoryId, title, image, description, content, oldItem) {
    this.deleteArticle(oldItem)
      .then(() => this.saveArticle(categoryId, title, image, description, content));
  }

  deleteArticle = ({content, id, categoryId}) => content.delete()
    .then(() =>
      this.firestore.collection('records')
        .doc(categoryId)
        .collection('records')
        .doc(id)
        .delete(),
    );

}
