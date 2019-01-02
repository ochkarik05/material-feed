import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.app = app;
        this.db = app.firestore();
        this.db.settings(settings);
    }

    signOut = () => this.auth.signOut().then(() => {
        console.log('Signed Out');
    });

    signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    getCategories = () => this.db.collection('categories').get();
    getArticles = (ref) => ref.get();
}
