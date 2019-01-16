import FirebaseApi from './firebaseApi';
import JsonServerApi from './jsonServerApi';

export const FIREBASE_PROVIDER = 'firebase_provider';
export const JSON_SERVER_PROVIDER = 'json_server_provider';


let firebaseApiInstance;
let jsonServerApiInstance;


function firebaseApi() {
  if(!firebaseApiInstance){
    firebaseApiInstance = new FirebaseApi()
  }
  return firebaseApiInstance;
}

function jsonServerApi() {
  if(!jsonServerApiInstance){
    jsonServerApiInstance = new JsonServerApi()
  }
  return jsonServerApiInstance;
}

export default (provider) => {

  switch (provider) {
    case FIREBASE_PROVIDER:
      return firebaseApi();

    case JSON_SERVER_PROVIDER:
      return jsonServerApi();

    default: throw Error("Invalid provider. Provider must extends API class")
  }

}
