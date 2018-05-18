import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import {checkNotNull} from "./preconditions";

const config = {
    apiKey: "AIzaSyCsMvCBfLCB0UFN8o-z5tWjTcCeQgOpTlQ",
    authDomain: "revolutionary-ring.firebaseapp.com",
    databaseURL: "https://revolutionary-ring.firebaseio.com",
    projectId: "revolutionary-ring",
    storageBucket: "revolutionary-ring.appspot.com",
    messagingSenderId: "1060846433711"
};
firebase.initializeApp(config);
export const firestore = checkNotNull(firebase.firestore)();
export const auth = checkNotNull(firebase.auth)();
