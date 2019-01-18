import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as ROUTES from '../../Constants/routes';
import firebase from 'firebase';
import {withFirebase} from '../Firebase';

const FirebaseUi = (props) => {

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: ROUTES.HOME,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={props.firebase.auth}/>
    </div>
  );

};

export default withFirebase(FirebaseUi);
