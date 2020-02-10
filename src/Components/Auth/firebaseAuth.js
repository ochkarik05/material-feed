import * as ROLES from '../../Constants/roles';

export class AuthWithFirebase {

  constructor(firebase) {
    this.auth = firebase.auth;
    this.database = firebase.database;
  }

  registerCallback(callback) {

    return this.auth.onAuthStateChanged(authUser => {

      if (authUser) {
        this.database.ref('users').child(authUser.uid).once('value').then(snapshot => {

          return this._createOrGetUser(snapshot, authUser).then(({username, role}) => ({
            username: username || 'Anonymous',
            role: role || ROLES.USER,
          }));

        }).then(user => {
          console.log("Before callback in then");
          console.log(user);
          return callback(user);
        });

      } else {
        let user = {
          username: 'Guest',
          role: ROLES.GUEST,
        };
        console.log("Before callback");
        console.log(user);
        callback(user);
      }

    });
  };

  _createOrGetUser = (snapshot, authUser) => {

    if (snapshot.val()) {

      const {username, role} = snapshot.val();
      return Promise.resolve({
        username: username || 'Anonymous',
        role: role || ROLES.USER,
      });

    } else {
      return this._createNewUser(authUser);
    }
  };

  _createNewUser = (authUser) => {

    let user = {
      username: authUser.displayName,
      role: ROLES.USER,
    };

    return new Promise((resolve, reject) => {

      this.database.ref('users').child(authUser.uid).set(user, error => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      })

    });

  };

  signOut = () => this.auth.signOut()
}

